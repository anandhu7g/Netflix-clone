import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import MovieRow from "../components/MovieRow";
import ReasonsSection from "../components/ReasonsSection";
import FAQSection from "../components/FAQSection";
import FooterSection from "../components/FooterSection";

function Home() {
  const { t } = useTranslation();
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
        setTrendingMovie(response.data.results[0]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrending();
  }, [API_KEY]);

  if (!trendingMovie) return <p className="text-light">Loading...</p>;

  return (
    <>
      <HeroSection />
      <div className="home-page" style={{ background: "#000" }}>
        <div className="container-fluid px-2 px-md-5 pt-3">
          <h1 className="text-light text-center text-md-start trending-heading">{t("trendingMovies")}</h1>
          {movies.length > 0 && <MovieRow movies={movies} />}
        </div>
        <ReasonsSection />
        <FAQSection />
        <FooterSection />
      </div>
      <style>{
        `
          @media (max-width: 480px) {
            .trending-heading {
              font-size: 1.2rem;
            }
          } 
        `
        }
      </style>
    </>
  );
}

export default Home;
