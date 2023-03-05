import type { PokemonFusionMeta } from "~/data";

export interface FavoritesState {
  list: Omit<Map<string, PokemonFusionMeta>, "add" | "delete" | "clear">;
  add(value: PokemonFusionMeta): void;
  remove(key: string | PokemonFusionMeta): void;
}
