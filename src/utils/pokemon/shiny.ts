import { POKEMON_COUNT } from "~/data";

import type { PokemonId } from "~/data";

const shinyColorOffsetsDict: Partial<Record<PokemonId, number>> = {
  1: -30,
  2: -85,
  3: -50,
  4: 40,
  5: 60,
  6: 130,
  7: 25,
  8: 15,
  9: 50,
  10: -50,
  11: -80,
  12: 95,
  129: 36,
  130: 150,
  342: 50,
} as const;

// Calculates the hue of the shiny and returns it.
// This tries to replicate the calculation made in the game itself.
export const calculateShinyHue = (
  id1: PokemonId,
  id2: PokemonId,
  hasShinyHead: boolean,
  hasShinyBody: boolean
) => {
  const customOffset1 = shinyColorOffsetsDict[id1];
  const customOffset2 = shinyColorOffsetsDict[id2];
  if (
    hasShinyHead &&
    hasShinyBody &&
    customOffset1 != null &&
    customOffset2 != null
  ) {
    return customOffset1 + customOffset2;
  } else if (hasShinyHead && customOffset1 != null) {
    return customOffset1;
  } else if (hasShinyBody && customOffset2 != null) {
    return customOffset2;
  } else {
    return calculateShinyHueDeafult(id1, id2, hasShinyHead, hasShinyBody);
  }
};

// Calculates the hue of the shiny and returns it.
// This tries to replicate the calculation made in the game itself.
export const calculateShinyHueDeafult = (
  id1: PokemonId,
  id2: PokemonId,
  hasShinyHead: boolean,
  hasShinyBody: boolean
) => {
  let dexOffset = id1 + id2 * POKEMON_COUNT;
  const dexDiff = Math.abs(id2 - id1);

  if (hasShinyHead && !hasShinyBody) {
    dexOffset = id1;
  } else if (!hasShinyHead && hasShinyBody) {
    dexOffset = dexDiff > 20 ? id2 : id2 + 40;
  }

  let offset = dexOffset + 75;
  if (offset > POKEMON_COUNT) {
    offset /= 360;
  }
  if (offset < 40) {
    offset = 40;
  }
  if (Math.abs(360 - offset) < 40) {
    offset = 40;
  }

  return offset;
};
