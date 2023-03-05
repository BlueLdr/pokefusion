import { useEffect, useMemo, useState } from "react";

import { fusePokemonMeta, getFusionSprite } from "~/utils";
import { PokemonId } from "~/data";

import type { PokemonFusionMeta, PokemonMeta, FusionSprite } from "~/data";

export const useFusionMeta = (
  head: PokemonMeta | undefined,
  body: PokemonMeta | undefined,
  spritePlaceholderSrc = "question.png"
): PokemonFusionMeta | undefined => {
  const headId = head?.id;
  const bodyId = body?.id;
  const selectionsAreValid =
    headId && PokemonId[headId] != null && bodyId && PokemonId[bodyId] != null;

  const [fusionSprite, setFusionSprite] = useState<FusionSprite>({
    id: "",
    src: selectionsAreValid ? "" : spritePlaceholderSrc,
    isCustom: false,
  });

  useEffect(() => {
    if (selectionsAreValid) {
      getFusionSprite(headId, bodyId).then(sprite => setFusionSprite(sprite));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headId, bodyId]);

  return useMemo(() => {
    if (!selectionsAreValid) {
      return;
    }
    return fusePokemonMeta(head, body, fusionSprite);
  }, [selectionsAreValid, head, body, fusionSprite]);
};
