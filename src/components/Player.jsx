import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { X } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Player({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTrailer() {
      try {
        const res = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );

        const videos = res.data.results || [];
        const trailer = videos.find((vid) => vid.type === "Trailer");

        if (isMounted) {
          setTrailerKey(trailer ? trailer.key : null);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        if (isMounted) setTrailerKey(null);
      }
    }

    if (movie?.id) {
      fetchTrailer();
    }

    document.body.style.overflow = "hidden";
    return () => {
      isMounted = false;
      document.body.style.overflow = "auto";
    };
  }, [movie, API_KEY]);

  if (!trailerKey) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      {/* Close Button floating outside the video */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", // use fixed so it always stays in viewport
          top: "20px",
          right: "20px",
          background: "rgba(0,0,0,0.6)",
          border: "none",
          color: "white",
          fontSize: "32px",
          cursor: "pointer",
          zIndex: 1100,
          padding: "6px 12px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <X />
      </button>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          height: 0,
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default Player;



