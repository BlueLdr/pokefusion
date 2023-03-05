import { doesImageExist } from "~/utils";

import type { PokemonId, FusionSprite, Pokemon } from "~/data";

//================================================

export const fusePokemon = (id1: number, id2: number) => {};

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

export const fuseTypes = (mon1: Pokemon, mon2: Pokemon): Pokemon["types"] => {
  const types1 = mon1.types;
  const types2 = mon2.types;
  // if both are single type
  if (types1.length === 1 && types2.length === 1) {
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
