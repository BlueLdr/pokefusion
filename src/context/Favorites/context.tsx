import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadStorage, setStorage } from "~/utils";

import type { PokemonFusionMeta } from "~/data";
import type { WithChildren } from "~/utils";
import type { FavoritesState } from "./types";

//================================================

const FAVORITES_STORAGE_KEY = "favorites";

const storedList = loadStorage(FAVORITES_STORAGE_KEY, {});
const initialSet = new Map<string, PokemonFusionMeta>(
  typeof storedList === "object" ? Object.entries(storedList) : []
);

export const FavoritesContext = createContext<FavoritesState>({
  list: initialSet,
  add: () => {},
  remove: () => {},
});

//================================================

export const FavoritesProvider: React.FC<WithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState(initialSet);

  const addFavorite = useCallback((value: PokemonFusionMeta) => {
    setFavorites(curValue => {
      if (curValue.has(value.fusionId)) {
        return curValue;
      }
      const newSet = new Map(curValue);
      newSet.set(value.fusionId, value);
      return newSet;
    });
  }, []);

  const removeFavorite = useCallback((value: string | PokemonFusionMeta) => {
    setFavorites(curValue => {
      const id = typeof value === "string" ? value : value.fusionId;
      if (!curValue.has(id)) {
        return curValue;
      }
      const newSet = new Map(curValue);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const value = useMemo(
    () => ({
      list: favorites,
      add: addFavorite,
      remove: removeFavorite,
    }),
    [addFavorite, favorites, removeFavorite]
  );

  useEffect(() => {
    setStorage(FAVORITES_STORAGE_KEY, Object.fromEntries(favorites.entries()));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
