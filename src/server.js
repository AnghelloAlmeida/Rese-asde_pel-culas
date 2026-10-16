import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.resolve(here, '../data');
const dataFile = path.join(dataDirectory, 'registros.json');
let saveQueue = Promise.resolve();
const genres = [
  'Acción', 'Animación', 'Aventura', 'Ciencia ficción', 'Comedia', 'Documental',
  'Drama', 'Fantasía', 'Romance', 'Suspenso', 'Terror', 'Otro',
];

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '20kb' }));

async function readRecords() {
  await mkdir(dataDirectory, { recursive: true });
  try {
    const content = await readFile(dataFile, 'utf8');
    const records = JSON.parse(content);
    if (!Array.isArray(records)) throw new Error('El archivo de registros debe contener una lista.');
    return records;
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(dataFile, '[]\n', 'utf8');
      return [];
    }
    throw error;
  }
}

function validateRecord(body) {
  const fields = {
    pelicula: typeof body?.pelicula === 'string' ? body.pelicula.trim() : '',
    autor: typeof body?.autor === 'string' ? body.autor.trim() : '',
    email: typeof body?.email === 'string' ? body.email.trim() : '',
    descripcion: typeof body?.descripcion === 'string' ? body.descripcion.trim() : '',
    fecha: typeof body?.fecha === 'string' ? body.fecha.trim() : '',
    genero: typeof body?.genero === 'string' ? body.genero.trim() : '',
  };
  const errors = {};
  if (!fields.pelicula) errors.pelicula = 'Escribe el título de la película.';
  else if (fields.pelicula.length > 120) errors.pelicula = 'El título no puede superar 120 caracteres.';
  if (!fields.autor) errors.autor = 'Escribe tu nombre.';
  else if (fields.autor.length > 80) errors.autor = 'El nombre no puede superar 80 caracteres.';
  if (!fields.email) errors.email = 'Escribe tu email.';
  else if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Escribe un email válido.';
  if (!fields.descripcion) errors.descripcion = 'Escribe tu reseña.';
  else if (fields.descripcion.length < 12) errors.descripcion = 'La reseña debe tener al menos 12 caracteres.';
  else if (fields.descripcion.length > 1200) errors.descripcion = 'La reseña no puede superar 1200 caracteres.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.fecha) || Number.isNaN(Date.parse(`${fields.fecha}T00:00:00Z`)) || new Date(`${fields.fecha}T00:00:00Z`).toISOString().slice(0, 10) !== fields.fecha) {
    errors.fecha = 'Selecciona una fecha válida.';
  } else if (fields.fecha > new Date().toISOString().slice(0, 10)) {
    errors.fecha = 'La fecha no puede ser futura.';
  }
  if (!genres.includes(fields.genero)) errors.genero = 'Selecciona un género de la lista.';
  return { fields, errors };
}

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/registros', async (_req, res) => {
  try {
    const registros = await readRecords();
    res.status(200).json({ registros });
  } catch (error) {
    console.error('No se pudieron leer los registros:', error);
    res.status(500).json({ error: 'No se pudieron consultar las reseñas. Inténtalo de nuevo.' });
  }
});

app.post('/registros', async (req, res) => {
  const { fields, errors } = validateRecord(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'Revisa los datos del formulario.', campos: errors });
  }

  try {
    const save = saveQueue.then(async () => {
      const registros = await readRecords();
      const registro = { id: randomUUID(), ...fields, creadoEn: new Date().toISOString() };
      registros.push(registro);
      await writeFile(dataFile, `${JSON.stringify(registros, null, 2)}\n`, 'utf8');
      return registro;
    });
    saveQueue = save.catch(() => {});
    const registro = await save;
    return res.status(201).json({ registro, mensaje: 'Reseña publicada.' });
  } catch (error) {
    console.error('No se pudo guardar la reseña:', error);
    return res.status(500).json({ error: 'No se pudo guardar la reseña. Inténtalo de nuevo.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'El cuerpo de la petición debe ser JSON válido.' });
  }
  console.error('Error inesperado en la API:', error);
  return res.status(500).json({ error: 'Ocurrió un error inesperado.' });
});

app.listen(port, () => console.log(`API de Cine en palabras disponible en http://localhost:${port}`));
