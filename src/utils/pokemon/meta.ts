import {
  PokemonId,
  POKEMON_COUNT,
  POKEMON_NAME_EXCEPTIONS,
  POKEMON_NAME_FIXES,
} from "~/data";

import { capitalize } from "@mui/material/utils";

import type { PokemonName } from "~/data";

//================================================

export const getRandomPokeID = () =>
  Math.floor(Math.random() * Math.floor(POKEMON_COUNT));

export const getPokemonName = (
  id: (typeof PokemonId)[PokemonName]
): string | undefined => {
  let name = PokemonId[id].toLowerCase();
  const fixIndex = POKEMON_NAME_FIXES.indexOf(name as PokemonName);
  if (fixIndex > -1) {
    name = POKEMON_NAME_EXCEPTIONS[fixIndex];
  }
  return capitalize(name);
};
