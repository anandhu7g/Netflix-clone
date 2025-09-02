function MovieCard({ title, poster, rating }) {
  return (
    <div className="card bg-dark text-light movie-card" style={{ width: "200px", cursor: "pointer" }}>
      <img
        src={poster}
        className="card-img-top"
        alt={title}
        style={{ borderRadius: "5px", transition: "transform 0.3s", objectFit: "cover", height: "300px" }}
      />
      <div className="card-body p-2">
        <h6 className="card-title mb-1">{title}</h6>
        <p className="card-text mb-0">⭐ {rating.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
