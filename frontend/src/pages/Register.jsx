import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRegistro } from '../api.js';
import Message from '../components/Message.jsx';

const genres = ['Acción', 'Animación', 'Aventura', 'Ciencia ficción', 'Comedia', 'Documental', 'Drama', 'Fantasía', 'Romance', 'Suspenso', 'Terror', 'Otro'];
const today = new Date().toLocaleDateString('en-CA');
const initialForm = { pelicula: '', autor: '', email: '', descripcion: '', fecha: today, genero: '' };

function validate(form) {
  const errors = {};
  if (!form.pelicula.trim()) errors.pelicula = 'Escribe el título de la película.';
  if (!form.autor.trim()) errors.autor = 'Escribe tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Escribe un email válido.';
  if (form.descripcion.trim().length < 12) errors.descripcion = 'Cuéntanos un poco más (al menos 12 caracteres).';
  if (!form.fecha) errors.fecha = 'Selecciona la fecha de tu reseña.';
  else if (form.fecha > today) errors.fecha = 'La fecha no puede ser futura.';
  if (!form.genero) errors.genero = 'Selecciona un género.';
  return errors;
}

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function submit(event) {
    event.preventDefault();
    setNotice('');
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setSubmitting(true);
    try {
      await createRegistro(Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])));
      navigate('/lista', { state: { message: 'Tu reseña ya forma parte de la conversación.' } });
    } catch (error) {
      setNotice(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-wrap register-page">
      <Link to="/" className="back-link">← Volver al inicio</Link>
      <div className="form-layout">
        <div className="form-intro">
          <span className="eyebrow"><span className="eyebrow-dot" /> TU VOZ TAMBIÉN CUENTA</span>
          <h1>Cuéntanos qué<br /><em>te dejó</em> la película.</h1>
          <p>Las mejores conversaciones empiezan con una opinión sincera. Comparte la tuya.</p>
          <div className="quote-card"><span>“</span><p>El cine es un espejo pintado.</p><small>— Ettore Scola</small></div>
        </div>
        <form className="review-form" onSubmit={submit} noValidate>
          <div className="form-heading"><span className="form-step">01 / 01</span><h2>Nueva reseña</h2><p>Los campos con <b>*</b> son obligatorios.</p></div>
          {notice && <Message kind="error">{notice}</Message>}
          <label className="field" htmlFor="pelicula">Película <b>*</b>
            <input id="pelicula" name="pelicula" value={form.pelicula} onChange={update} placeholder="Ej. La vida de los otros" maxLength="120" aria-invalid={!!errors.pelicula} />
            {errors.pelicula && <small className="field-error">{errors.pelicula}</small>}
          </label>
          <div className="field-row">
            <label className="field" htmlFor="autor">Tu nombre <b>*</b>
              <input id="autor" name="autor" value={form.autor} onChange={update} placeholder="¿Cómo te llamas?" maxLength="80" aria-invalid={!!errors.autor} />
              {errors.autor && <small className="field-error">{errors.autor}</small>}
            </label>
            <label className="field" htmlFor="email">Email <b>*</b>
              <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="tu@email.com" maxLength="254" aria-invalid={!!errors.email} />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </label>
          </div>
          <div className="field-row">
            <label className="field" htmlFor="genero">Género <b>*</b>
              <select id="genero" name="genero" value={form.genero} onChange={update} aria-invalid={!!errors.genero}>
                <option value="">Elige un género</option>{genres.map((genre) => <option key={genre}>{genre}</option>)}
              </select>
              {errors.genero && <small className="field-error">{errors.genero}</small>}
            </label>
            <label className="field" htmlFor="fecha">Fecha de la reseña <b>*</b>
              <input id="fecha" name="fecha" type="date" max={today} value={form.fecha} onChange={update} aria-invalid={!!errors.fecha} />
              {errors.fecha && <small className="field-error">{errors.fecha}</small>}
            </label>
          </div>
          <label className="field" htmlFor="descripcion">Tu reseña <b>*</b>
            <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={update} placeholder="¿Qué te hizo sentir? ¿Qué escena se quedó contigo?" rows="5" maxLength="1200" aria-invalid={!!errors.descripcion} />
            <span className="field-foot">{form.descripcion.length}/1200</span>
            {errors.descripcion && <small className="field-error">{errors.descripcion}</small>}
          </label>
          <button className="button button-dark submit-button" type="submit" disabled={submitting}>{submitting ? 'Publicando…' : 'Publicar reseña'} <span aria-hidden="true">↗</span></button>
          <p className="privacy-note">Tu email se usa para validar el registro y no se muestra en la lista pública.</p>
        </form>
      </div>
    </main>
  );
}
