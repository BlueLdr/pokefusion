import type { To } from "react-router-dom";
import type { PokemonFusionMeta } from "~/data";

export const getRouteFromFusion = (fusion: PokemonFusionMeta): To => {
  const params = new URLSearchParams();
  if (fusion.head?.shiny) {
    params.set("leftShiny", "true");
  }
  if (fusion.body?.shiny) {
    params.set("rightShiny", "true");
  }
  return {
    pathname: fusion.fusionId,
    search: params.toString(),
  };
};
