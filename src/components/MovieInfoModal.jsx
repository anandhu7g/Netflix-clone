import React, { useEffect } from "react";

function MovieInfoModal({ movie, onClose, onPlay }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!movie) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#111",
          borderRadius: "8px",
          width: "800px",
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Poster Image */}
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title || movie.name}
          style={{
            width: "250px",
            borderRadius: "6px",
            objectFit: "cover",
          }}
        />

        {/* Movie Details */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "10px" }}>
            {movie.title || movie.name}
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
            {movie.overview}
          </p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              className="btn btn-light"
              onClick={() => {
                onPlay(movie);
                onClose();
              }}
            >
              ▶ Play
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoModal;


