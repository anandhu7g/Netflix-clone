import { useRef, useState, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // custom smooth scroll
  const smoothScroll = (element, distance, duration = 600) => {
    const start = element.scrollLeft;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing (easeOutCubic)
      const ease = 1 - Math.pow(1 - progress, 3);

      element.scrollLeft = start + distance * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const distance = direction === "left" ? -clientWidth : clientWidth;
      smoothScroll(rowRef.current, distance, 1200); // adjust duration for smoother/faster
    }
  };

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      checkScroll();
    });
    const el = rowRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", checkScroll);
    };
  }, [movies]);

  return (
    <div className="position-relative my-4">
      <h2 className="text-light mb-2">{title}</h2>
      <div className="position-relative">
          {/* Left Chevron */}
          {canScrollLeft && (
            <button 
              className="chevron-btn left"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={43} />
            </button>
          )}

        {/* Movie List */}
        <div
          ref={rowRef}
          className="d-flex overflow-x-scroll hide-scrollbar"
          style={{ gap: "15px" }}
        >
          {movies.map((m) => (
            <div
              key={m.id}
              style={{ minWidth: "200px", position: "relative" }}
              className="movie-container"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                className="movie-img img-fluid rounded"
              />
            </div>
          ))}
        </div>

          {/* Right Chevron */}
          {canScrollRight && (
            <button 
              className="chevron-btn right"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={43} />
            </button>
          )}
      </div>

      {/* Styles */}
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

        /* Movie hover fix */
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

export default MovieRow;
