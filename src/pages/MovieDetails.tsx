import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TMovie } from "../types/movie";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieDetails() {
  const [movie, setMovie] = useState<TMovie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const { watchlist, addWatchList, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = movie
    ? watchlist.some((m) => m.imdbID === movie.imdbID)
    : false;

  const handleWatchlistClick = (e: React.MouseEvent, movie: TMovie) => {
    e.preventDefault(); // Prevent navigation if inside a link
    if (isInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addWatchList(movie);
    }
  };

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_OMB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`,
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovie(imdbID);
    }
  }, [imdbID]);

  if (loading)
    return (
      <div className="spinner-container" style={{ minHeight: "50vh" }}>
        <div className="spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="movie-details-error">
        <p className="movie-details-error-text">{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );

  if (!movie) return <p className="text-center py-12">No Movie Found!</p>;

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-button">
        <span className="back-button-arrow">←</span> Back to Search
      </button>

      <div className="movie-details-layout">
        {/* Poster Column */}
        <div className="movie-details-poster-card">
          <div className="movie-details-poster">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
              alt={movie.Title}
            />
          </div>

          <button
            className={`watchlist-button movie-details-watchlist-button ${
              isInWatchlist
                ? "watchlist-button--remove"
                : "watchlist-button--add"
            }`}
            onClick={(e) => handleWatchlistClick(e, movie)}
          >
            <span>{isInWatchlist ? "−" : "+"}</span>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>

        {/* Details Column */}
        <div className="movie-details-content">
          <div>
            <h1 className="movie-details-title">{movie.Title}</h1>
            <div className="movie-details-meta">
              <span className="movie-details-tag">{movie.Rated}</span>
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
            </div>
          </div>

          <div className="movie-details-rating-row">
            <div className="movie-details-rating-block">
              <span className="movie-details-rating-label">IMDb Rating</span>
              <div className="movie-details-rating-value-row">
                <span className="movie-details-rating-star">⭐</span>
                <span className="movie-details-rating-score">
                  {movie.imdbRating}
                </span>
                <span className="movie-details-rating-outof">/10</span>
              </div>
            </div>
            {movie.Metascore !== "N/A" && (
              <div className="movie-details-rating-block">
                <span className="movie-details-rating-label">Metascore</span>
                <div className="movie-details-rating-value-row">
                  <span
                    className={`movie-details-metascore ${
                      parseInt(movie.Metascore) > 60
                        ? "movie-details-metascore--good"
                        : "movie-details-metascore--ok"
                    }`}
                  >
                    {movie.Metascore}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="movie-details-plot-title">Plot</h3>
            <p className="movie-details-plot">{movie.Plot}</p>
          </div>

          <div className="movie-details-info-grid">
            <div>
              <h3 className="movie-details-info-title">Director</h3>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h3 className="movie-details-info-title">Writers</h3>
              <p>{movie.Writer}</p>
            </div>
            <div>
              <h3 className="movie-details-info-title">Cast</h3>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h3 className="movie-details-info-title">Awards</h3>
              <p className="movie-details-awards">{movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
