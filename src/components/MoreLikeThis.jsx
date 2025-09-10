// src/components/MoreLikeThis.jsx
import React, { useRef, useState, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MoreLikeThis({ recommendations, onInfoClick }) {
  const scrollRef = useRef(null);

  if (!recommendations || recommendations.length === 0) return null;

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
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const distance = direction === "left" ? -clientWidth : clientWidth;
    smoothScroll(scrollRef.current, distance, 800);
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [recommendations]);

  return (
    <div style={{ position: "relative", marginTop: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>More Like This</h3>

      {/* Chevron Left */}
      <button
        onClick={() => scroll("left")}
        style={{
          position: "absolute",
          left: 0,
          top: "40%",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          border: "none",
          borderRadius: "50%",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={24} color="white" />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "hidden", // hide scrollbar
          scrollBehavior: "smooth",
          padding: "10px 40px", // space for chevrons
        }}
      >
        {recommendations.map((movie) => (
          <div
            key={movie.id}
            style={{
              minWidth: "150px",
              flexShrink: 0,
              background: "#222",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => onInfoClick && onInfoClick(movie)} // 👈 open new modal
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || movie.name}
              style={{  width: "150px",
              height: "225px",
              borderRadius: "6px",
              objectFit: "cover",
              flexShrink: 0, display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Chevron Right */}
      <button
        onClick={() => scroll("right")}
        style={{
          position: "absolute",
          right: 0,
          top: "40%",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          border: "none",
          borderRadius: "50%",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        <ChevronRight size={24} color="white" />
      </button>
    </div>
  );
}

export default MoreLikeThis;





