const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  // Movies
  fetchTrending: (cert) =>
    `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchTopRated: (cert) =>
    `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=50${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchActionMovies: (cert) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=28${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchComedyMovies: (cert) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=35${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchHorrorMovies: (cert) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=27${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchRomanceMovies: (cert) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=10749${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,
  fetchDocumentaries: (cert) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=99${
      cert ? `&certification_country=US&certification=${cert}` : ""
    }`,

  // TV Shows (certifications not supported)
  fetchTVPopular: () => `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTVTopRated: () => `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
};

export default requests;





