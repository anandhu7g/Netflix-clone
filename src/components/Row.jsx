import React, { useEffect, useState } from "react";
import axios from "../services/axios"; // instead of "axios"

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row text-white px-4 my-5">
      <h2 className="mb-3">{title}</h2>
      <div className="d-flex overflow-auto gap-3">
        {(movies || []).map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.name || movie.title}
            style={{
              width: "150px",
              height: "225px",
              objectFit: "cover",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;

