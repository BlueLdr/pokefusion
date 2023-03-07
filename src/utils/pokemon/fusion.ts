import {
  POKEMON_COUNT,
  PokemonType,
  POKEMON_SELF_FUSION_TYPE_OVERRIDES,
  POKEMON_TYPE_OVERRIDES,
} from "~/data";
import { doesImageExist } from "~/utils";

import type {
  FusionSprite,
  Pokemon,
  PokemonFusionMeta,
  PokemonId,
  PokemonMeta,
} from "~/data";

//================================================

export const fusePokemonMeta = (
  head: PokemonMeta,
  body: PokemonMeta,
  sprite?: FusionSprite
): PokemonFusionMeta => ({
  head,
  body,
  sprite,
  get fusionId() {
    return `${this.head.id}.${this.body.id}`;
  },
  get fusionDexId() {
    return getFusionId(this.head.id, this.body.id);
  },
});

export const fusePokemon = (id1: number, id2: number) => {};

export const getFusionId = (id1: number, id2: number) =>
  id1 + id2 * POKEMON_COUNT;

export const getFusionSprite = async (
  id1: PokemonId,
  id2: PokemonId
): Promise<FusionSprite> => {
  const fusionId = `${id1}.${id2}`;
  const customUrl = `${
    import.meta.env.POKEFUSION_UI_CUSTOM_SPRITES_BASE_PATH
  }/${fusionId}.png`;
  if (await doesImageExist(customUrl)) {
    return {
      id: fusionId,
      src: customUrl,
      isCustom: true,
    };
  }

  const [headId] = fusionId.split(".");
  return {
    id: fusionId,
    src: `${
      import.meta.env.POKEFUSION_UI_NORMAL_SPRITES_BASE_PATH
    }/${headId}/${fusionId}.png`,
    isCustom: false,
  };
};

const checkTypeFusionExceptions = (mon: Pokemon): Pokemon["types"] => {
  if (POKEMON_TYPE_OVERRIDES.has(mon.id)) {
    return POKEMON_TYPE_OVERRIDES.get(mon.id)!;
  }
  if (
    mon.types[0] === PokemonType.Normal &&
    mon.types[1] === PokemonType.Flying
  ) {
    return [PokemonType.Flying];
  }
  return mon.types;
};

export const fuseTypes = (mon1: Pokemon, mon2: Pokemon): Pokemon["types"] => {
  let types1: Pokemon["types"];
  let types2: Pokemon["types"];

  // prepare types by checking for exceptions
  if (mon1.id === mon2.id && POKEMON_SELF_FUSION_TYPE_OVERRIDES.has(mon1.id)) {
    types1 = POKEMON_SELF_FUSION_TYPE_OVERRIDES.get(mon1.id)!;
    types2 = types1;
  } else {
    types1 = checkTypeFusionExceptions(mon1);
    types2 = checkTypeFusionExceptions(mon2);
  }

  if (types1.length === 1 && types2.length === 1) {
    // if both are single type
    const type1 = types1[0];
    const type2 = types2[0];
    return type1 === type2 ? [type1] : [type1, type2];
  }

  // if both are dual type
  if (types1.length === 2 && types2.length === 2) {
    const type2 = types1[0] === types2[1] ? types2[0] : types2[1];
    return [types1[0], type2];
  }

  const type1 = types1[0];
  // if mon1 is dual type and mon2 is single type
  if (types1.length === 2) {
    // types2.length = 1
    const type2 = types2[0];
    return type2 !== type1 ? [type1, type2] : [type1];
  }
  // mon1 is single type and mon2 is dual type
  return [type1, types2[1] !== type1 ? types2[1] : types2[0]];
};
