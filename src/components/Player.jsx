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
          if (trailer) {
            setTrailerKey(trailer.key);
          } else {
            console.warn("No trailer found for", movie.title || movie.name);
            setTrailerKey(null);
          }
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        if (isMounted) setTrailerKey(null);
      }
    }

    if (movie?.id) {
      fetchTrailer();
    }

    // ✅ lock scroll when Player mounts
    document.body.style.overflow = "hidden";

    return () => {
      // cleanup: unlock scroll + cancel updates
      isMounted = false;
      document.body.style.overflow = "auto";
    };
  }, [movie, API_KEY]);


  if (!trailerKey) return null; // avoid blank screen until trailer loads

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
      }}
    >
      <div style={{ position: "relative", width: "80%", height: "80%" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "32px",
            cursor: "pointer",
          }}
        >
          <X />
        </button>

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Player;


