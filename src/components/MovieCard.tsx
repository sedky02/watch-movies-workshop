import { NavLink } from "react-router";
import type { TSearchMovie } from "../types/movie";
import { useWatchlist } from "../context/WatchlistContext";

type MovieCardProps = {
  movie: TSearchMovie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { watchlist, addWatchList, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    if (isInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addWatchList(movie);
    }
  };

  return (
    <div className="movie-card">
      {/* Poster Image */}
      <NavLink
        to={`/movie/${movie.imdbID}`}
        className="movie-card-poster-link"
      >
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "../assets/placeholder.jpg"
          }
          alt={movie.Title}
          className="movie-card-image"
          loading="lazy"
        />
      </NavLink>

      {/* Content */}
      <div className="movie-card-body">
        <NavLink
          to={`/movie/${movie.imdbID}`}
          className="movie-card-title-link"
        >
          <h3
            className="movie-card-title"
            title={movie.Title}
          >
            {movie.Title}
          </h3>
        </NavLink>

        <div className="movie-card-meta">
          <span>{movie.Year}</span>
          <span className="movie-card-type">
            {movie.Type}
          </span>
        </div>

        <button
          onClick={handleWatchlistClick}
        className={`watchlist-button ${
            isInWatchlist
            ? "watchlist-button--remove"
            : "watchlist-button--add"
          }`}
        >
          <span>{isInWatchlist ? "−" : "+"}</span>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
