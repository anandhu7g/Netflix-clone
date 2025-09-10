import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { Play } from "lucide-react";
import Row from "./Row"; 

function MovieInfoModal({ movie, onClose, onPlay, onInfoClick, user, myList, setMyList }) { 
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [franchise, setFranchise] = useState([]);

  const handleAddToMyList = async (movie) => {
    if (!user) {
      alert("Please login to add to My List");
      return;
    }

    const isInList = myList.some((m) => m.id === movie.id);
    const updatedList = isInList
      ? myList.filter((m) => m.id !== movie.id)
      : [...myList, movie];

    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, { myList: updatedList });
      setMyList(updatedList); // updates parent state
    } catch (err) {
      console.error("Error updating My List:", err);
      alert("Failed to update My List");
    }
  };

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // fetch details for both Movie and TV
  useEffect(() => {
    if (!movie?.id) return;

    let cancelled = false;

    // reset between selections to avoid stale flashes
    setDetails(null);
    setCast([]);
    setSimilar([]);
    setFranchise([]);

    (async () => {
      try {
        const isTV = movie.media_type === "tv" || !!movie.first_air_date;
        const base = isTV ? "/tv" : "/movie";
        const key = import.meta.env.VITE_TMDB_API_KEY;

        // Details
        const resDetails = await axios.get(
          `${base}/${movie.id}?api_key=${key}&language=en-US`
        );
        if (cancelled) return;
        setDetails(resDetails.data);

        // Cast
        const resCast = await axios.get(
          `${base}/${movie.id}/credits?api_key=${key}&language=en-US`
        );
        if (cancelled) return;
        setCast((resCast.data?.cast || []).slice(0, 3));

        // Similar
        const resSimilar = await axios.get(
          `${base}/${movie.id}/similar?api_key=${key}&language=en-US&page=1`
        );
        if (cancelled) return;
        setSimilar((resSimilar.data?.results || []).slice(0, 10));

        // Franchise (only for MOVIES that belong to a collection)
        if (!isTV && resDetails.data?.belongs_to_collection?.id) {
          const collectionId = resDetails.data.belongs_to_collection.id;
          const resCollection = await axios.get(
            `/collection/${collectionId}?api_key=${key}&language=en-US`
          );
          if (cancelled) return;
          setFranchise(resCollection.data?.parts || []);
        } else {
          setFranchise([]);
        }
      } catch (err) {
        console.error("Error fetching movie/tv info:", err);
        // keep a minimal shape so UI doesn't crash
        if (!cancelled) {
          setDetails((prev) => prev || {});
          setCast([]);
          setSimilar([]);
          setFranchise([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [movie?.id, movie?.media_type, movie?.first_air_date]);

  if (!movie) return null;

  const loading = !details;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
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
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header / Loading */}
        {loading ? (
          <div style={{ padding: 30, textAlign: "center" }}>Loading…</div>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            {details?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                alt={details?.title || details?.name}
                style={{ borderRadius: "6px", minWidth: "180px" }}
              />
            ) : details?.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${details.backdrop_path}`}
                alt={details?.title || details?.name}
                style={{ borderRadius: "6px", minWidth: "180px" }}
              />
            ) : (
              <div
                style={{
                  width: 180,
                  height: 270,
                  background: "#222",
                  borderRadius: 6,
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h2>{details?.title || details?.name}</h2>

              <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
                {details?.overview || "No overview available."}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {typeof details?.vote_average === "number"
                  ? `${details.vote_average} / 10`
                  : "N/A"}{" "}
                {details?.vote_count ? `(${details.vote_count} votes)` : ""}
              </p>

              <p>
                <strong>Release:</strong>{" "}
                {details?.release_date?.slice(0, 4) ||
                  details?.first_air_date?.slice(0, 4) ||
                  "N/A"}
              </p>

              {details?.runtime ? (
                <p>
                  <strong>Runtime:</strong> {details.runtime} min
                </p>
              ) : details?.episode_run_time?.length ? (
                <p>
                  <strong>Episode runtime:</strong>{" "}
                  {details.episode_run_time[0]} min
                </p>
              ) : null}

              <p>
                <strong>Genres:</strong>{" "}
                {details?.genres?.length
                  ? details.genres.map((g) => g.name).join(", ")
                  : "N/A"}
              </p>

              <p>
                <strong>Top Cast:</strong>{" "}
                {cast?.length ? cast.map((c) => c.name).join(", ") : "N/A"}
              </p>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-light d-flex align-items-center gap-2"
                  onClick={() => {
                    onPlay?.(movie);
                    onClose?.();
                  }}
                >
                  <Play size={20} /> Play
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleAddToMyList(movie)}
                >
                  {myList.some(m => m.id === movie.id) ? "Remove from My List" : "Add to My List"}
                </button>
                <button className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Franchise Row (movies only) */}
        <Row
          title="Franchise"
          propMovies={franchise}
          onInfoClick={onInfoClick}
        />

        {/* More Like This */}
        <Row
          title="More Like This"
          propMovies={similar}
          onInfoClick={onInfoClick}
        />
      </div>
    </div>
  );
}

export default MovieInfoModal;










