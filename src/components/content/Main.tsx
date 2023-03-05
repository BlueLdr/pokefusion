import { useState } from "react";

import { PokemonFusionView } from "./PokemonFusionView";
import { PokemonFusionPicker } from "./PokemonFusionPicker";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import type { StyleProps } from "~/theme";
import type { WithChildren } from "~/utils";
import type { PokemonMeta } from "~/data";

//================================================

const columnItemInnerStyle: StyleProps = {
  minWidth: "100%",
  display: "inline-flex",
  justifyContent: "center",
  "& > *": {
    flex: "1 1 100%",
  },
};

const ColumnItem: React.FC<WithChildren> = ({ children }) => (
  <Grid item xs={12} sm={6}>
    <Box sx={columnItemInnerStyle}>{children}</Box>
  </Grid>
);
ColumnItem.displayName = "ColumnItem";

//================================================

export const Main: React.FC = () => {
  const [pkmnLeft, setPkmnLeft] = useState<PokemonMeta>();
  const [pkmnRight, setPkmnRight] = useState<PokemonMeta>();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      flex="1 0 100%"
      mt={8}
    >
      <Grid container alignItems="center" spacing={6}>
        <ColumnItem>
          <PokemonFusionPicker
            pokemon={pkmnLeft}
            setPokemon={setPkmnLeft}
            fieldProps={{
              label: "Pokemon 1",
            }}
          />
        </ColumnItem>
        <ColumnItem>
          <PokemonFusionPicker
            pokemon={pkmnRight}
            setPokemon={setPkmnRight}
            fieldProps={{
              label: "Pokemon 2",
            }}
          />
        </ColumnItem>
      </Grid>
      <Grid container alignItems="center" mt={4} spacing={6}>
        <ColumnItem>
          <PokemonFusionView head={pkmnLeft} body={pkmnRight} />
        </ColumnItem>
        <ColumnItem>
          <PokemonFusionView head={pkmnRight} body={pkmnLeft} />
        </ColumnItem>
      </Grid>
    </Grid>
  );
};
