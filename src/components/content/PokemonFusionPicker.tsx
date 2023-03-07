import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";

import { PokemonSelector, SpacedGrid } from "~/components";
import { getPokemonName, getRandomPokeID } from "~/utils";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";

import type { PokemonMeta, PokemonId } from "~/data";
import type { TextFieldProps } from "@mui/material/TextField";

//================================================

const Container = styled(SpacedGrid)`
  & > .MuiGrid-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

//================================================

export const PokemonFusionPicker: React.FC<{
  pokemon?: PokemonMeta;
  setPokemon: (value: PokemonMeta) => void;
  fieldProps?: Partial<TextFieldProps>;
}> = ({ pokemon, setPokemon, fieldProps }) => {
  const [id, setId] = useState<PokemonId>(pokemon?.id as PokemonId);
  const [shiny, setShiny] = useState<boolean>(!!pokemon?.shiny);

  const onClickRandomize = useCallback(() => {
    setId(oldId => {
      const newId = getRandomPokeID();
      return newId !== oldId ? newId : getRandomPokeID();
    });
  }, []);
  const onChangeShiny = useCallback(
    (e: any, checked: boolean) => setShiny(checked),
    []
  );

  useEffect(() => {
    if (id == null) {
      return;
    }
    setPokemon({
      id,
      name: getPokemonName(id) ?? "???",
      shiny,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, shiny]);

  useEffect(() => {
    if (!pokemon) {
      return;
    }
    if (id !== pokemon?.id) {
      setId(pokemon.id);
    }
    if (shiny !== pokemon?.shiny) {
      setShiny(!!pokemon.shiny);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  return (
    <Container
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <PokemonSelector
        onChange={setId}
        value={pokemon?.id}
        fieldProps={fieldProps}
      />
      <SpacedGrid spacing={6} alignItems="center" justifyContent="center">
        <Tooltip title="Feature coming soon!">
          <FormControlLabel
            labelPlacement="end"
            control={
              <Checkbox
                name="shiny1"
                checked={shiny}
                onChange={onChangeShiny}
              />
            }
            label="Shiny"
            disabled={true}
          />
        </Tooltip>
        <Button
          endIcon={<ShuffleRounded />}
          onClick={onClickRandomize}
          variant="outlined"
        >
          Random
        </Button>
      </SpacedGrid>
    </Container>
  );
};
