import { enumEntries } from "~/utils";
import { PokemonType } from "./types";

import type { PokemonName, TypeEffectivenessMapKey } from "./types";

//================================================

export const POKEMON_COUNT = 420;

export const POKEMON_NAME_EXCEPTIONS = [
  "deoxys",
  "giratina",
  "mimikyu",
  "aegislash",
  "mimejr",
  "mrmime",
  "nidoranm",
  "nidoranf",
  "porygonz",
  "hooh",
  "hoho",
  "ohho",
  "ohoh",
] as readonly string[];

export const POKEMON_NAME_FIXES: readonly PokemonName[] = [
  "deoxys-normal",
  "giratina-altered",
  "mimikyu-disguised",
  "aegislash-shield",
  "mime-jr",
  "mr-mime",
  "nidoran-m",
  "nidoran-f",
  "porygon-z",
  "ho-oh",
  "ho-oh",
  "ho-oh",
  "ho-oh",
];

const typeEffectiveness = {
  Normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1, 1], //
  Fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1, 1], //
  Water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1], //
  Electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1], //
  Grass: [
    1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1, 1,
  ], //
  Ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1, 1], //
  Fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5, 1], //
  Poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2, 1], //
  Ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1, 1], //
  Flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1, 1], //
  Psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1, 1], //
  Bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5, 1], //
  Rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1], //
  Ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1, 1], //
  Dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0, 1], //
  Dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5, 1], //
  Steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2, 1], //
  Fairy: [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1, 1], //
  None: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //
};

export const TYPE_EFFECTIVENESS_MAP = new Map<
  TypeEffectivenessMapKey,
  Map<TypeEffectivenessMapKey, number>
>([
  ...enumEntries(PokemonType).map(entry => {
    const map = new Map<TypeEffectivenessMapKey, number>();
    const thisRow = typeEffectiveness[entry[0]].slice();
    enumEntries(PokemonType).forEach(([key, value], index) => {
      map.set(value, thisRow[index]);
    });
    map.set("none", thisRow.pop() ?? 1);
    return [entry[1], map] as const;
  }),
  [
    "none",
    new Map<TypeEffectivenessMapKey, number>([
      ...enumEntries(PokemonType).map(entry => [entry[1], 1] as const),
      ["none", 1],
    ]),
  ],
]);
