// @ts-expect-error: no ts support reeeeeeee
import { Pokedex } from "pokeapi-js-wrapper";

import { comparator, createDisplayableError } from "~/utils";
import { PokemonId } from "~/data";

import type { Pokemon, PokemonMeta, PokemonStats } from "~/data";
import type { ApiResponse } from "./types";

const api = new Pokedex();

const STAT_NAME_MAP = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "spa",
  "special-defense": "spd",
  speed: "spe",
};
const parseStatsFromResponse = (responseStats: any): PokemonStats =>
  responseStats.map((data: any) => [
    STAT_NAME_MAP[data.stat.name as keyof typeof STAT_NAME_MAP],
    data.base_stat,
  ]);

export const getPokemon = (meta: PokemonMeta): Promise<ApiResponse<Pokemon>> =>
  (api.getPokemonByName(PokemonId[meta.id]) as Promise<any>)
    .then(response => ({
      data: {
        id: meta.id,
        name: response.name,
        shiny: meta.shiny,
        types: (response.types as any[])
          .sort(comparator("slot", "asc"))
          .map(t => t.type.name)
          .slice(0, 2) as unknown as Pokemon["types"],
        stats: parseStatsFromResponse(response.stats),
      },
      error: undefined,
    }))
    .catch(error => ({
      data: undefined,
      error: createDisplayableError(
        error,
        "Something went wrong while calling PokeAPI"
      ),
    }));
