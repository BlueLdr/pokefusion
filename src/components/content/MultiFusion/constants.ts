import { PokemonId } from "~/data";

export const DEFAULT_PRESET_LIST = [
  {
    name: "Eeveelutions",
    list: [
      { id: PokemonId.eevee, name: "Eevee", shiny: false },
      { id: PokemonId.vaporeon, name: "Vaporeon", shiny: false },
      { id: PokemonId.jolteon, name: "Jolteon", shiny: false },
      { id: PokemonId.flareon, name: "Flareon", shiny: false },
      { id: PokemonId.espeon, name: "Espeon", shiny: false },
      { id: PokemonId.umbreon, name: "Umbreon", shiny: false },
      { id: PokemonId.leafeon, name: "Leafeon", shiny: false },
      { id: PokemonId.glaceon, name: "Glaceon", shiny: false },
      { id: PokemonId.sylveon, name: "Sylveon", shiny: false },
    ],
  },
  {
    name: "Bangers",
    list: [
      { id: PokemonId.darkrai, name: "Darkrai", shiny: false },
      { id: PokemonId.gengar, name: "Gengar", shiny: false },
      { id: PokemonId.duskull, name: "Duskull", shiny: false },
      { id: PokemonId.mewtwo, name: "Mewtwo", shiny: false },
    ],
  },
];
