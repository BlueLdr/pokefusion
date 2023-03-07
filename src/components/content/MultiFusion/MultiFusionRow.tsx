import { useCallback } from "react";

import { MultiFusionItem } from "./MultiFusionItem";
import { MultiFusionRowPicker } from "./MultiFusionRowPicker";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import type { PokemonId, PokemonMeta } from "~/data";

//================================================

interface MultiFusionRowProps {
  rowMon?: PokemonMeta;
  onChangeRowMon: (prevId: PokemonId, newValue: PokemonMeta) => void;
  otherMon?: PokemonMeta;
  onRemove?: (id: PokemonId) => void;
}

export const MultiFusionRow: React.FC<MultiFusionRowProps> = ({
  rowMon,
  onChangeRowMon,
  otherMon,
  onRemove,
}) => {
  const setValue = useCallback(
    (newValue: PokemonMeta) =>
      onChangeRowMon(rowMon?.id as PokemonId, newValue),
    [onChangeRowMon, rowMon?.id]
  );

  const onClear = useCallback(
    () => (rowMon ? onRemove?.(rowMon?.id) : undefined),
    [onRemove, rowMon]
  );

  return (
    <Grid container justifyContent="space-between" spacing={4}>
      <Grid item xs={5} sm={4} md={3}>
        <MultiFusionRowPicker
          value={rowMon}
          setValue={setValue}
          onClear={rowMon ? onClear : undefined}
        />
      </Grid>
      <Grid item xs={7} sm={8} md={9} minHeight="100%">
        {rowMon ? (
          <Grid container spacing={4}>
            <Grid item sm={6}>
              <MultiFusionItem head={rowMon} body={otherMon} />
            </Grid>
            <Grid item sm={6}>
              <MultiFusionItem head={otherMon} body={rowMon} />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            minHeight="100%"
          >
            <Typography color="textSecondary">
              Select a Pokemon to add a row
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
