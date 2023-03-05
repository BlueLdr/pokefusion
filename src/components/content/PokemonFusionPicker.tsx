import { useCallback, useEffect, useState } from "react";

import { PokemonSelector, SpacedGrid } from "~/components";
import { getPokemonName, getRandomPokeID } from "~/utils";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { PokemonMeta } from "~/data";
import type { TextFieldProps } from "@mui/material/TextField";

export const PokemonFusionPicker: React.FC<{
  pokemon?: PokemonMeta;
  setPokemon: (value: PokemonMeta) => void;
  fieldProps?: Partial<TextFieldProps>;
}> = ({ pokemon, setPokemon, fieldProps }) => {
  const [id, setId] = useState(pokemon?.id);
  const [shiny, setShiny] = useState<boolean>(!!pokemon?.shiny);

  const onClickRandomize = useCallback(() => setId(getRandomPokeID()), []);
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
    <Card variant="elevation">
      <CardContent>
        <SpacedGrid direction="column" spacing={4}>
          <PokemonSelector
            onChange={setId}
            value={pokemon?.id}
            fieldProps={fieldProps}
          />
          <SpacedGrid spacing={6} alignItems="center">
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
        </SpacedGrid>
      </CardContent>
    </Card>
  );
};
