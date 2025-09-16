import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // ✅ detect screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // smooth scroll function
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
      const { clientWidth } = rowRef.current;
      const distance = direction === "left" ? -clientWidth : clientWidth;
      smoothScroll(rowRef.current, distance, 1200);
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
    const t = setTimeout(checkScroll, 300);
    el.addEventListener("scroll", checkScroll);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", checkScroll);
    };
  }, [movies]);

  return (
    <div className="position-relative my-4">
      <div className="position-relative">
        {/* Left Chevron */}
        {isDesktop && canScrollLeft && (
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
          {movies.map((m) => (
            <div key={m.id} className="movie-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                className="movie-img img-fluid rounded"
                onLoad={checkScroll}
              />
            </div>
          ))}
        </div>

        {/* Right Chevron */}
        {isDesktop && canScrollRight && (
          <button className="chevron-btn right" onClick={() => scroll("right")}>
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

  /* Movie container */
  .movie-container {
    flex: 0 0 auto;
    width: 200px;
    height: 300px;
    position: relative;
    overflow: hidden;
  }
    
  .movie-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
    display: block;
  }

  .movie-img:hover {
    transform: scale(1.15);
  }

  /* ✅ Responsive adjustments */
  @media (max-width: 1200px) {
    .movie-container {
      width: 180px;
      height: 270px;
    }
  }

  @media (max-width: 992px) {
    .movie-container {
      width: 160px;
      height: 240px;
    }
  }

  @media (max-width: 768px) {
    .movie-container {
      width: 140px;
      height: 210px;
    }
    /* Hide arrows on tablets/phones */
    .chevron-btn {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .movie-container {
      width: 110px;
      height: 165px;
    }
  }
`}</style>
    </div>
  );
}

export default MovieRow;


