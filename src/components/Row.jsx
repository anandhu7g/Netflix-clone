import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "../services/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  const smoothScroll = (element, distance, duration = 600) => {
    const start = element.scrollLeft;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      element.scrollLeft = start + distance * ease;

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const distance = direction === "left" ? -clientWidth : clientWidth;
      smoothScroll(rowRef.current, distance, 800);
    }
  };

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [movies]);

  return (
    <div className="position-relative my-4">
      <h2 className="text-light mb-2">{title}</h2>
      <div className="position-relative">
        {/* Left Chevron */}
        {canScrollLeft && (
          <button className="chevron-btn left" onClick={() => scroll("left")}>
            <ChevronLeft size={43} />
          </button>
        )}

        {/* Movie List */}
        <div
          ref={rowRef}
          className="d-flex overflow-x-scroll hide-scrollbar"
          style={{ gap: "15px" }}
        >
          {(movies || []).map((movie) => (
            <div
              key={movie.id}
              style={{ minWidth: "150px", position: "relative" }}
              className="movie-container"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.name || movie.title}
                className="movie-img img-fluid rounded"
                style={{ height: "225px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Right Chevron */}
        {canScrollRight && (
          <button className="chevron-btn right" onClick={() => scroll("right")}>
            <ChevronRight size={43} />
          </button>
        )}
      </div>

      {/* Inline styles */}
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
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .chevron-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          color: black;
          transform: translateY(-50%) scale(1.15);
        }
        .chevron-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        .chevron-btn.left {
          left: 12px;
        }
        .chevron-btn.right {
          right: 12px;
        }

        /* Hide scrollbar */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          scrollbar-width: none;
        }

        /* Movie hover */
        .movie-container {
          overflow: hidden;
        }
        .movie-img {
          transition: transform 0.3s ease;
          display: block;
        }
        .movie-img:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

export default Row;




