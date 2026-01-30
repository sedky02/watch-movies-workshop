import { createContext, useState, useContext } from "react";
import type { TSearchMovie } from "../types/movie";

type TWatchlistProps = {
  watchlist: TSearchMovie[];
  addWatchList: (movie: TSearchMovie) => void;
  removeFromWatchlist: (imdbID: string) => void;
};

const WatchlistContext = createContext<TWatchlistProps | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlist, setWatchlist] = useState<TSearchMovie[]>([]);

  const addWatchList = (movie: TSearchMovie) => {
    if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };
  const removeFromWatchlist = (imdbID: string) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addWatchList, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
