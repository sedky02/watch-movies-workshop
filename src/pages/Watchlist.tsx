import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import { NavLink } from "react-router-dom";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-primary">Your</span> Watchlist
            <span className="text-sm font-normal text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}
            </span>
          </h1>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-white/5 border-dashed">
            <div className="text-6xl mb-6 opacity-20">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Your watchlist is empty
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Movies you add to your watchlist will appear here. Go explore and
              find something to watch!
            </p>
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors shadow-lg hover:shadow-primary/20"
            >
              Browse Movies
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
