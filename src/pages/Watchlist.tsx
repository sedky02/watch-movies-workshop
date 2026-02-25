import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import { NavLink } from "react-router-dom";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="page">
      <div className="page-container">
        <div className="watchlist-header">
          <h1 className="watchlist-title">
            <span className="home-title-accent">Your</span> Watchlist
            <span className="watchlist-count">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}
            </span>
          </h1>
        </div>

        {watchlist.length === 0 ? (
          <div className="watchlist-empty">
            <div className="watchlist-empty-emoji">🎬</div>
            <h2 className="watchlist-empty-title">Your watchlist is empty</h2>
            <p className="watchlist-empty-text">
              Movies you add to your watchlist will appear here. Go explore and
              find something to watch!
            </p>
            <NavLink
              to="/"
              className="watchlist-empty-button"
            >
              Browse Movies
            </NavLink>
          </div>
        ) : (
          <div className="movie-grid">
            {watchlist.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
