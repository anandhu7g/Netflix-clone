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
      setMyList(updatedList);
    } catch (err) {
      console.error("Error updating My List:", err);
      alert("Failed to update My List");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    if (!movie?.id) return;
    let cancelled = false;

    setDetails(null);
    setCast([]);
    setSimilar([]);
    setFranchise([]);

    (async () => {
      try {
        const isTV = movie.media_type === "tv" || !!movie.first_air_date;
        const base = isTV ? "/tv" : "/movie";
        const key = import.meta.env.VITE_TMDB_API_KEY;

        const resDetails = await axios.get(
          `${base}/${movie.id}?api_key=${key}&language=en-US`
        );
        if (cancelled) return;
        setDetails(resDetails.data);

        const resCast = await axios.get(
          `${base}/${movie.id}/credits?api_key=${key}&language=en-US`
        );
        if (cancelled) return;
        setCast((resCast.data?.cast || []).slice(0, 3));

        const resSimilar = await axios.get(
          `${base}/${movie.id}/similar?api_key=${key}&language=en-US&page=1`
        );
        if (cancelled) return;
        setSimilar((resSimilar.data?.results || []).slice(0, 10));

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
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : (
            <div className="modal-header">
              {details?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                  alt={details?.title || details?.name}
                  className="modal-poster"
                />
              ) : details?.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${details.backdrop_path}`}
                  alt={details?.title || details?.name}
                  className="modal-poster"
                />
              ) : (
                <div className="modal-placeholder" />
              )}

              <div className="modal-info">
                <h2>{details?.title || details?.name}</h2>
                <p className="overview">{details?.overview || "No overview available."}</p>

                <p><strong>Rating:</strong> {details?.vote_average || "N/A"} / 10</p>
                <p><strong>Release:</strong> {details?.release_date?.slice(0, 4) || details?.first_air_date?.slice(0, 4) || "N/A"}</p>
                {details?.runtime && <p><strong>Runtime:</strong> {details.runtime} min</p>}
                <p><strong>Genres:</strong> {details?.genres?.map((g) => g.name).join(", ") || "N/A"}</p>
                <p><strong>Top Cast:</strong> {cast?.map((c) => c.name).join(", ") || "N/A"}</p>

                <div className="modal-actions">
                  <button className="btn btn-light d-flex align-items-center gap-2"
                    onClick={() => { onPlay?.(movie); onClose?.(); }}>
                    <Play size={20} /> Play
                  </button>
                  <button className="btn btn-warning" onClick={() => handleAddToMyList(movie)}>
                    {myList.some(m => m.id === movie.id) ? "Remove from My List" : "Add to My List"}
                  </button>
                  <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
              </div>
            </div>
          )}

          <Row title="Franchise" propMovies={franchise} onInfoClick={onInfoClick} />
          <Row title="More Like This" propMovies={similar} onInfoClick={onInfoClick} />
        </div>
      </div>
      {/* ✅ Responsive styles inside style tag */}
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }

        .modal-content {
          background: #111;
          padding: 20px;
          border-radius: 8px;
          width: 80%;
          max-height: 85vh;
          overflow-y: auto;
        }

        .loading {
          padding: 30px;
          text-align: center;
        }

        .modal-header {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .modal-poster {
          border-radius: 6px;
          min-width: 180px;
          max-width: 200px;
        }

        .modal-placeholder {
          width: 180px;
          height: 270px;
          background: #222;
          border-radius: 6px;
        }

        .modal-info {
          flex: 1;
        }

        .modal-info p {
          font-size: 1rem;
          line-height: 1.2;
        }

        .modal-actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ✅ Tablet */
        @media (max-width: 768px) {
          .modal-header {
            flex-direction: column;
            align-items: center;
            text-align: left;
          }

          .modal-poster {
            max-width: 150px;
            min-width: unset;
          }

          .modal-info {
            width: 100%;
          }

          .modal-actions {
            justify-content: center;
          }
        }

        /* ✅ Mobile */
        @media (max-width: 480px) {
          .modal-content {
            width: 95%;
            padding: 15px;
          }

          .modal-poster {
            max-width: 120px;
          }

          .overview,
          .modal-details p {
            font-size: 0.7rem;
            line-height: 1.2;
          }

          .modal-actions {
            flex-direction: row;   
            justify-content: flex-start; 
            flex-wrap: wrap;       
            gap: 8px;
          }
          .modal-actions .btn {
            font-size: 0.8rem;  
            padding: 4px 8px;   
            line-height: 1.2;    
          }
        }
      `}</style>
    </>
  );
}

export default MovieInfoModal;











