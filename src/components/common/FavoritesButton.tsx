import { useCallback, useContext } from "react";

import { FavoritesContext } from "~/context";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StarRounded from "@mui/icons-material/StarRounded";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";

import type { PokemonFusionMeta } from "~/data";
import type { StyleProps } from "~/theme";

//================================================

const iconButtonStyle: StyleProps = {
  transition: theme => theme.transitions.create(["color", "background-color"]),
  "&:not(:hover):not(.Mui-focusVisible):not(.Mui-selected)": {
    color: theme => theme.palette.text.secondary,
  },
};

//================================================

export const FavoritesButton: React.FC<{ fusion: PokemonFusionMeta }> = ({
  fusion,
}) => {
  const { list, add, remove } = useContext(FavoritesContext);

  const isFavorite = list.has(fusion.fusionId);

  const onClick = useCallback(() => {
    if (isFavorite) {
      remove(fusion);
    } else {
      add(fusion);
    }
  }, [add, fusion, isFavorite, remove]);

  return (
    <Tooltip title="Add to favorites">
      <IconButton
        color="warning"
        className={isFavorite ? "Mui-selected" : undefined}
        sx={iconButtonStyle}
        disableRipple={false}
        onClick={onClick}
      >
        {isFavorite ? <StarRounded /> : <StarOutlineRounded />}
      </IconButton>
    </Tooltip>
  );
};
