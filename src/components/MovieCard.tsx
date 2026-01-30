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
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/5 hover:border-primary/50">
      {/* Poster Image */}
      <NavLink
        to={`/movie/${movie.imdbID}`}
        className="block aspect-2/3 overflow-hidden"
      >
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "../assets/placeholder.jpg"
          }
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </NavLink>

      {/* Content */}
      <div className="p-4">
        <NavLink to={`/movie/${movie.imdbID}`} className="block mb-2">
          <h3
            className="text-lg font-semibold text-white truncate group-hover:text-primary transition-colors"
            title={movie.Title}
          >
            {movie.Title}
          </h3>
        </NavLink>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">{movie.Year}</span>
          <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300 border border-gray-700 uppercase tracking-wider">
            {movie.Type}
          </span>
        </div>

        <button
          onClick={handleWatchlistClick}
          className={`w-full py-2 px-4 text-sm font-medium rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            isInWatchlist
              ? "bg-red-600/20 hover:bg-red-600/40 text-red-500"
              : "bg-white/10 hover:bg-primary text-white"
          }`}
        >
          <span>{isInWatchlist ? "−" : "+"}</span>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
