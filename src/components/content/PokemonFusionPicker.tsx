import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";

import { PokemonSelector, SpacedGrid } from "~/components";
import { POKEMON_COUNT } from "~/data";
import { getPokemonName, getRandomPokeID } from "~/utils";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";
import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";

import type { PokemonMeta } from "~/data";
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
  const [id, setId] = useState(pokemon?.id);
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

  const onClickPrevious = useCallback(() => {
    setId(prevId => (!!prevId && prevId > 1 ? prevId - 1 : prevId));
  }, []);

  const onClickNext = useCallback(() => {
    setId(prevId => (!!prevId && prevId < POKEMON_COUNT ? prevId + 1 : prevId));
  }, []);

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

  const { prev, next } = useMemo(() => {
    if (!pokemon) {
      return { prev: "", next: "" };
    }
    return {
      prev:
        pokemon.id > 1
          ? `${pokemon.id - 1}. ${getPokemonName(pokemon.id - 1)}`
          : "",
      next:
        pokemon.id < POKEMON_COUNT
          ? `${pokemon.id + 1}. ${getPokemonName(pokemon.id + 1)}`
          : "",
    };
  }, [pokemon]);

  return (
    <Container
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        wrap="nowrap"
      >
        <Grid item>
          <Tooltip title={prev}>
            <IconButton
              disabled={pokemon?.id === 1}
              onClick={onClickPrevious}
              disableRipple={false}
            >
              <KeyboardArrowLeftRounded />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          item
          flex="1 1 100%"
          sx={{ maxWidth: theme => theme.spacing(64) }}
        >
          <PokemonSelector
            onChange={setId}
            value={pokemon?.id}
            fieldProps={fieldProps}
          />
        </Grid>
        <Grid item>
          <Tooltip title={next}>
            <IconButton
              disabled={pokemon?.id === POKEMON_COUNT}
              onClick={onClickNext}
              disableRipple={false}
            >
              <KeyboardArrowRightRounded />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
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
