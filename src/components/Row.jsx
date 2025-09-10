import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "../services/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Row({ title, fetchUrl, propMovies = [], onInfoClick, certificationFilter = "" }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!fetchUrl) return;
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(Array.isArray(request.data.results) ? request.data.results : []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const moviesToDisplay = useMemo(() => {
    const baseMovies = propMovies.length > 0 ? propMovies : movies;

    if (!certificationFilter || certificationFilter === "ALL") return baseMovies;

    if (certificationFilter === "R") {
      return baseMovies.filter((m) => m.adult === true);
    }
    if (["G", "PG", "PG-13"].includes(certificationFilter)) {
      return baseMovies.filter((m) => m.adult === false);
    }

    return baseMovies;
  }, [movies, propMovies, certificationFilter]);

  const smoothScroll = (element, distance, duration = 600) => {
    const start = element.scrollLeft;
    const startTime = performance.now();
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      element.scrollLeft = start + distance * ease;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const distance = direction === "left" ? -rowRef.current.clientWidth : rowRef.current.clientWidth;
      smoothScroll(rowRef.current, distance);
    }
  };

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [moviesToDisplay]);

  if (!moviesToDisplay || moviesToDisplay.length === 0) return null;

  return (
    <div className="position-relative my-4">
      {title && <h2 className="mb-2">{title}</h2>}

      <div className="position-relative">
        {canScrollLeft && (
          <button className="chevron-btn left" onClick={() => scroll("left")}>
            <ChevronLeft size={43} />
          </button>
        )}

        <div ref={rowRef} className="d-flex overflow-x-scroll hide-scrollbar" style={{ gap: "15px" }}>
          {moviesToDisplay.map((movie, index) => (
            <div
              key={movie.id || index}
              style={{ minWidth: "150px", position: "relative", cursor: "pointer" }}
              className="movie-container"
              onClick={() => onInfoClick && onInfoClick(movie)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title || movie.name || "Untitled"}
                  className="movie-img img-fluid rounded"
                  style={{ width: "150px", height: "225px", objectFit: "cover", borderRadius: "6px" }}
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "225px",
                    background: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                >
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button className="chevron-btn right" onClick={() => scroll("right")}>
            <ChevronRight size={43} />
          </button>
        )}
      </div>

      <style jsx>{`
        .chevron-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          border-radius: 50%;
          padding: 8px;
          z-index: 20;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chevron-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          color: black;
          transform: translateY(-50%) scale(1.15);
        }
        .chevron-btn.left { left: 12px; }
        .chevron-btn.right { right: 12px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
        .movie-container { overflow: hidden; }
        .movie-img { transition: transform 0.3s ease; display: block; }
        .movie-img:hover { transform: scale(1.2); }
      `}</style>
    </div>
  );
}

export default Row;















