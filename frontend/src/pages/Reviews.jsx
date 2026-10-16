import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRegistros } from '../api.js';
import Message from '../components/Message.jsx';
import ReviewCard from '../components/ReviewCard.jsx';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(useLocation().state?.message || '');

  async function loadReviews() {
    setLoading(true);
    setError('');
    try { setReviews(await getRegistros()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadReviews(); }, []);

  return (
    <main className="page-wrap list-page">
      <div className="list-heading">
        <div><span className="eyebrow"><span className="eyebrow-dot" /> VOCES DE LA COMUNIDAD</span><h1>Historias que<br /><em>siguen resonando.</em></h1><p>Cada reseña es una nueva forma de ver la misma película.</p></div>
        <Link className="button button-dark" to="/registro">Escribir una reseña <span aria-hidden="true">↗</span></Link>
      </div>
      {notice && <Message kind="success" onClose={() => setNotice('')}>{notice}</Message>}
      {loading ? <div className="state-panel"><span className="spinner" /><p>Cargando reseñas…</p></div> : error ? <div className="state-panel state-error"><span className="state-icon">!</span><h2>No pudimos cargar las reseñas</h2><p>{error}</p><button type="button" className="button button-outline" onClick={loadReviews}>Intentar de nuevo</button></div> : reviews.length === 0 ? <div className="state-panel empty-state"><span className="empty-icon">✳</span><h2>La primera reseña puede ser la tuya.</h2><p>Aún no hay reseñas publicadas. Elige una película que te haya marcado y cuéntanos por qué.</p><Link className="button button-dark" to="/registro">Publicar la primera <span aria-hidden="true">↗</span></Link></div> : <>
        <div className="results-meta"><span>{reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}</span><span>ORDENADAS POR FECHA DE PUBLICACIÓN</span></div>
        <section className="review-grid" aria-label="Reseñas publicadas">{[...reviews].reverse().map((review) => <ReviewCard key={review.id} review={review} />)}</section>
      </>}
    </main>
  );
}
