const genreColors = {
  Drama: 'plum',
  'Ciencia ficción': 'blue',
  Comedia: 'orange',
  Terror: 'red',
  Romance: 'pink',
};

export default function ReviewCard({ review }) {
  const date = new Date(`${review.fecha}T00:00:00`).toLocaleDateString('es', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  return (
    <article className="review-card">
      <div className="review-card-top">
        <span className={`genre-pill ${genreColors[review.genero] || 'neutral'}`}>{review.genero}</span>
        <time dateTime={review.fecha}>{date}</time>
      </div>
      <h2>{review.pelicula}</h2>
      <p className="review-copy">“{review.descripcion}”</p>
      <div className="review-author">
        <span className="avatar" aria-hidden="true">{review.autor.trim().charAt(0).toUpperCase()}</span>
        <span><strong>{review.autor}</strong><small>Crítica de cine</small></span>
      </div>
    </article>
  );
}
