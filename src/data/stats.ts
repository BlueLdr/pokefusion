//#region Stats

import { PokemonId } from "./types";

import type { PokemonStats } from "./types";

export const POKEMON_STATS_FIXES = {
  //Aegislash
  [PokemonId["aegislash-shield"]]: {
    hp: 60,
    atk: 50,
    def: 150,
    spa: 50,
    spd: 150,
    spe: 60,
  },

  //Butterfree
  [PokemonId["butterfree"]]: {
    hp: 60,
    atk: 45,
    def: 50,
    spa: 80,
    spd: 80,
    spe: 70,
  },

  //Beedrill
  [PokemonId["beedrill"]]: {
    hp: 65,
    atk: 80,
    def: 40,
    spa: 45,
    spd: 80,
    spe: 75,
  },

  //Pidgeot
  [PokemonId["pidgeot"]]: {
    hp: 83,
    atk: 80,
    def: 75,
    spa: 70,
    spd: 70,
    spe: 91,
  },

  //Pikachu
  [PokemonId["pikachu"]]: {
    hp: 35,
    atk: 55,
    def: 30,
    spa: 50,
    spd: 40,
    spe: 90,
  },

  //Raichu
  [PokemonId["raichu"]]: {
    hp: 60,
    atk: 90,
    def: 55,
    spa: 90,
    spd: 80,
    spe: 100,
  },

  //Nidoqueen
  [PokemonId["nidoqueen"]]: {
    hp: 90,
    atk: 82,
    def: 87,
    spa: 75,
    spd: 85,
    spe: 76,
  },

  //Nidoking
  [PokemonId["nidoking"]]: {
    hp: 81,
    atk: 92,
    def: 77,
    spa: 85,
    spd: 75,
    spe: 85,
  },

  //Clefable
  [PokemonId["clefable"]]: {
    hp: 95,
    atk: 70,
    def: 73,
    spa: 85,
    spd: 90,
    spe: 60,
  },

  //Wigglytuff
  [PokemonId["wigglytuff"]]: {
    hp: 140,
    atk: 70,
    def: 45,
    spa: 75,
    spd: 50,
    spe: 45,
  },

  //Vileplume
  [PokemonId["vileplume"]]: {
    hp: 75,
    atk: 80,
    def: 85,
    spa: 100,
    spd: 90,
    spe: 50,
  },

  //Poliwrath
  [PokemonId["poliwrath"]]: {
    hp: 90,
    atk: 85,
    def: 95,
    spa: 70,
    spd: 90,
    spe: 70,
  },

  //Alakazam
  [PokemonId["alakazam"]]: {
    hp: 55,
    atk: 50,
    def: 45,
    spa: 135,
    spd: 85,
    spe: 120,
  },

  //Victreebel
  [PokemonId["victreebel"]]: {
    hp: 80,
    atk: 105,
    def: 65,
    spa: 100,
    spd: 60,
    spe: 70,
  },

  //Golem
  [PokemonId["golem"]]: {
    hp: 80,
    atk: 110,
    def: 130,
    spa: 55,
    spd: 65,
    spe: 45,
  },

  //Ampharos
  [PokemonId["ampharos"]]: {
    hp: 90,
    atk: 75,
    def: 75,
    spa: 115,
    spd: 90,
    spe: 55,
  },

  //Bellossom
  [PokemonId["bellossom"]]: {
    hp: 75,
    atk: 80,
    def: 85,
    spa: 90,
    spd: 100,
    spe: 50,
  },

  //Azumarill
  [PokemonId["azumarill"]]: {
    hp: 100,
    atk: 50,
    def: 80,
    spa: 50,
    spd: 80,
    spe: 50,
  },

  //Jumpluff
  [PokemonId["jumpluff"]]: {
    hp: 75,
    atk: 55,
    def: 70,
    spa: 55,
    spd: 85,
    spe: 110,
  },

  //Roserade
  [PokemonId["roserade"]]: {
    hp: 60,
    atk: 70,
    def: 55,
    spa: 125,
    spd: 105,
    spe: 90,
  },

  //Krookodile
  [PokemonId["krookodile"]]: {
    hp: 95,
    atk: 117,
    def: 70,
    spa: 65,
    spd: 70,
    spe: 92,
  },

  //Magcargo
  [PokemonId["magcargo"]]: {
    hp: 50,
    atk: 50,
    def: 120,
    spa: 80,
    spd: 80,
    spe: 30,
  },

  //Arbok
  [PokemonId["arbok"]]: {
    hp: 60,
    atk: 85,
    def: 69,
    spa: 65,
    spd: 79,
    spe: 80,
  },

  //Ariados
  [PokemonId["ariados"]]: {
    hp: 70,
    atk: 90,
    def: 70,
    spa: 60,
    spd: 60,
    spe: 40,
  },

  //Mantine
  [PokemonId["mantine"]]: {
    hp: 65,
    atk: 40,
    def: 70,
    spa: 80,
    spd: 140,
    spe: 70,
  },

  //Electrode
  [PokemonId["electrode"]]: {
    hp: 60,
    atk: 50,
    def: 70,
    spa: 80,
    spd: 80,
    spe: 140,
  },

  //Dodrio
  [PokemonId["dodrio"]]: {
    hp: 60,
    atk: 110,
    def: 70,
    spa: 60,
    spd: 60,
    spe: 100,
  },

  //Noctowl
  [PokemonId["noctowl"]]: {
    hp: 100,
    atk: 50,
    def: 50,
    spa: 76,
    spd: 96,
    spe: 70,
  },

  //Qwilfish
  [PokemonId["qwilfish"]]: {
    hp: 65,
    atk: 95,
    def: 75,
    spa: 55,
    spd: 55,
    spe: 85,
  },

  //Dugtrio
  [PokemonId["dugtrio"]]: {
    hp: 35,
    atk: 80,
    def: 50,
    spa: 50,
    spd: 70,
    spe: 120,
  },

  //Farfetchd
  [PokemonId["farfetchd"]]: {
    hp: 52,
    atk: 65,
    def: 55,
    spa: 58,
    spd: 62,
    spe: 60,
  },

  //Corsola
  [PokemonId["corsola"]]: {
    hp: 55,
    atk: 55,
    def: 85,
    spa: 65,
    spd: 85,
    spe: 35,
  },

  //Exeggutor
  [PokemonId["exeggutor"]]: {
    hp: 95,
    atk: 95,
    def: 85,
    spa: 125,
    spd: 65,
    spe: 55,
  },
} as Record<PokemonId, PokemonStats>;

//Input
export const statsException = [
  "aegislash-shield",
  "butterfree",
  "beedrill",
  "pidgeot",
  "pikachu",
  "raichu",
  "nidoqueen",
  "nidoking",
  "clefable",
  "wigglytuff",
  "vileplume",
  "poliwrath",
  "alakazam",
  "victreebel",
  "golem",
  "ampharos",
  "bellossom",
  "azumarill",
  "jumpluff",
  "roserade",
  "magcargo",
  "arbok",
  "ariados",
  "mantine",
  "electrode",
  "dodrio",
  "noctowl",
  "qwilfish",
  "dugtrio",
  "farfetchd",
  "corsola",
  "exeggutor",
];

//Output
export const statsFix = Object.values(POKEMON_STATS_FIXES);

//#endregion
