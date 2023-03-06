import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { getPokemon } from "~/api";
import { fuseTypes, promiseAll } from "~/utils";
import { SpacedGrid } from "~/components";

import type { Pokemon, PokemonFusionMeta } from "~/data";

//================================================

const TypeImg = styled.img`
  height: ${({ theme }) => theme.spacing(10)};
`;

//================================================

export const PokemonFusionData: React.FC<{ meta: PokemonFusionMeta }> = ({
  meta,
}) => {
  const [types, setTypes] = useState<Pokemon["types"]>();
  useEffect(() => {
    promiseAll({
      head: getPokemon(meta.head),
      body: getPokemon(meta.body),
    }).then(response => {
      if (!response.error) {
        setTypes(fuseTypes(response.data.head, response.data.body));
      }
    });
  }, [meta]);

  if (!types) {
    return null;
  }

  return (
    <SpacedGrid spacing={4} justifyContent="center" my={2}>
      {types.map(t => (
        <TypeImg
          key={t}
          src={`${import.meta.env.DEV ? "" : "/pokefusion/"}types/${t}.png`}
          alt={t}
        />
      ))}
    </SpacedGrid>
  );
};
