import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
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
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary hover:underline"
        >
          Go Back
        </button>
      </div>
    );

  if (!movie) return <p className="text-center py-12">No Movie Found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>{" "}
        Back to Search
      </button>

      <div className="grid md:grid-cols-[350px_1fr] gap-8 lg:gap-12">
        {/* Poster Column */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
              alt={movie.Title}
              className="w-full h-auto object-cover"
            />
          </div>

          <button
            className={`w-full py-3 px-6 font-bold rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
              isInWatchlist
                ? "bg-red-400 hover:bg-red-700 text-white"
                : "bg-primary hover:bg-primary-hover text-white"
            }`}
            onClick={(e) => handleWatchlistClick(e, movie)}
          >
            <span>{isInWatchlist ? "−" : "+"}</span>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>

        {/* Details Column */}
        <div className="text-gray-300 space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
                {movie.Rated}
              </span>
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-white/10">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                IMDb Rating
              </span>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-2xl font-bold text-white">
                  {movie.imdbRating}
                </span>
                <span className="text-gray-500">/10</span>
              </div>
            </div>
            {movie.Metascore !== "N/A" && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Metascore
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xl font-bold ${
                      parseInt(movie.Metascore) > 60
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {movie.Metascore}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">Plot</h3>
            <p className="leading-relaxed text-gray-300 text-lg">
              {movie.Plot}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div>
              <h3 className="text-white font-semibold mb-1">Director</h3>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Writers</h3>
              <p>{movie.Writer}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Cast</h3>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Awards</h3>
              <p className="text-yellow-500/90">{movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
