import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { TSearchMovie } from "../types/movie";

export default function Home() {
  const INITIAL_SEARCH_TERM = "Avengers";
  const [movies, setMovies] = useState<TSearchMovie[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH_TERM);

  const fetchMovies = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = import.meta.env.VITE_OMB_API_KEY;

      const res = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        console.log(JSON.stringify(data.Search, null, 2));
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(INITIAL_SEARCH_TERM);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="page">
      {/* Hero / Search Section */}
      <div className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-title">
            Find your next <span className="home-title-accent">favorite</span>
          </h1>
          <p className="home-subtitle">
            Search through our extensive collection of movies and series. Create
            your personal watchlist and never miss a show.
          </p>

          <form
            onSubmit={handleSearch}
            className="search-form"
          >
            <div className="search-icon">
              <svg
                className="search-icon-svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies, series..."
                className="search-input"
            />
            <button
              type="submit"
                className="search-button"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content Section */}
      <div className="home-content">
        <div>
          <h2 className="home-section-title">
            {loading ? "Searching..." : `Results for "${searchTerm}"`}
          </h2>
        </div>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="message-box message-box-error">
            <p className="message-box-error-title">😕 {error}</p>
            <p className="message-box-error-subtitle">
              Try searching for something else.
            </p>
          </div>
        )}

        {!loading && !error && movies && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {!loading && !error && (!movies || movies.length === 0) && (
          <div className="empty-state">
            <p>No movies found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
