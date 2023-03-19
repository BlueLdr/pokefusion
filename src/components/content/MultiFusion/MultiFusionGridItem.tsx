import styled from "@emotion/styled";
import { useCallback } from "react";

import { getFusionNames, useFusionMeta } from "~/utils";
import { FavoritesButton } from "~/components";
import { MultiFusionRowPicker } from "./MultiFusionRowPicker";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteRounded from "@mui/icons-material/DeleteRounded";

import type { StyleProps } from "~/theme";
import type { PokemonId, PokemonMeta } from "~/data";

//================================================

const cardStyle: StyleProps = {
  width: "100%",
  borderColor: theme => theme.palette.grey["900"],
  "&.MuiPaper-outlined .MuiCardContent-root": {
    height: theme => theme.spacing(47.5),
  },
};

const cardHeaderStyle: StyleProps = {
  backgroundColor: theme => theme.palette.grey["900"],
  borderBottom: theme => `1px solid ${theme.palette.grey["700"]}`,
  padding: 0,
  "& .MuiAutocomplete-root": {
    width: "100%",
  },
  "& .MuiCardHeader-action": {
    margin: theme => `auto ${theme.spacing(1)}`,
    "& .MuiIconButton-root:not(:hover):not(.Mui-focusVisible)": {
      transitionProperty: "color, background-color, opacity",
      color: theme => theme.palette.action.disabled,
    },
  },
};

const cardContentStyle: StyleProps = {
  // backgroundColor: theme => theme.palette.grey["800"],
  height: theme => theme.spacing(48),
  "&, &:last-child": {
    padding: theme => theme.spacing(0),
    paddingTop: "1px",
  },
};

const cardHeaderFieldStyle: StyleProps = {
  marginBottom: "-1px",
  width: "100%",
  "&.MuiFormControl-root": {
    maxWidth: "none",
  },
  "& .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-sizeSmall": {
    borderTopRightRadius: 0,
    padding: theme => theme.spacing(1),
    "&:not(:hover):not(.Mui-focusVisible):not(.Mui-focused)": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiInputBase-root::before": {
    borderBottomColor: theme => theme.palette.grey["700"],
  },
};

const spriteContainerStyle: StyleProps = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const SpriteImg = styled.img`
  height: ${({ theme }) => theme.spacing(36)};
  width: ${({ theme }) => theme.spacing(36)};
  object-fit: contain;
  &.invisible {
    visibility: hidden;
  }
`;

const customBadgeStyle: StyleProps = {
  position: "absolute",
  top: 0,
  right: 0,
};

//================================================

const placeholderSrc = "question.png";

const MultiFusionGridItemSprite: React.FC<{
  head?: PokemonMeta;
  body?: PokemonMeta;
}> = ({ head, body }) => {
  const fusionMeta = useFusionMeta(head, body, placeholderSrc);

  const FavoritesBadge: React.FC = useCallback(
    () =>
      fusionMeta ? (
        <Box sx={customBadgeStyle}>
          <FavoritesButton fusion={fusionMeta} />
        </Box>
      ) : null,
    [fusionMeta]
  );
  FavoritesBadge.displayName = "FavoritesBadge";

  const title = (
    <Typography
      variant="subtitle2"
      lineHeight={1.5}
      sx={
        fusionMeta?.sprite?.isCustom
          ? {
              color: theme => theme.palette.success.main,
              textShadow: theme => `0 0 10px ${theme.palette.success.main}`,
            }
          : undefined
      }
    >
      {getFusionNames(head!, body!)}
    </Typography>
  );

  return (
    <Grid container direction="column" alignItems="center">
      <Grid container mb={2} p={2} alignItems="center" justifyContent="center">
        {fusionMeta?.sprite?.isCustom ? (
          <Tooltip placement="bottom" title="Custom sprite">
            {title}
          </Tooltip>
        ) : (
          title
        )}
      </Grid>
      <Badge
        overlap="circular"
        components={{
          Badge: FavoritesBadge,
        }}
        sx={{ width: "100%" }}
      >
        <Box
          sx={spriteContainerStyle}
          data-custom={fusionMeta?.sprite?.isCustom}
        >
          <SpriteImg
            src={fusionMeta?.sprite?.src ?? placeholderSrc}
            className={
              fusionMeta && !fusionMeta.sprite?.src ? "invisible" : undefined
            }
          />
        </Box>
      </Badge>
    </Grid>
  );
};
MultiFusionGridItemSprite.displayName = "MultiFusionGridItemSprite";

//================================================

interface MultiFusionGridItemProps {
  mon?: PokemonMeta;
  onChangeMon: (prevId: PokemonId, newValue: PokemonMeta) => void;
  otherMon?: PokemonMeta;
  onRemove?: (id: PokemonId) => void;
}

export const MultiFusionGridItem: React.FC<MultiFusionGridItemProps> = ({
  mon,
  onChangeMon,
  otherMon,
  onRemove,
}) => {
  const setValue = useCallback(
    (newValue: PokemonMeta) => onChangeMon(mon?.id as PokemonId, newValue),
    [onChangeMon, mon?.id]
  );

  return (
    <Card sx={cardStyle} variant={mon && otherMon ? "elevation" : "outlined"}>
      <CardHeader
        sx={cardHeaderStyle}
        titleTypographyProps={{
          variant: "body2",
          component: Grid,
          container: true,
          wrap: "nowrap",
          alignItems: "center",
          display: "flex",
        }}
        title={
          <MultiFusionRowPicker
            value={mon}
            setValue={setValue}
            fieldProps={{
              size: "small",
              variant: "filled",
              sx: cardHeaderFieldStyle,
              label: "",
            }}
          />
        }
        action={
          !!mon ? (
            <IconButton
              size="small"
              disableRipple={false}
              onClick={() => onRemove?.(mon?.id as number)}
            >
              <DeleteRounded />
            </IconButton>
          ) : null
        }
      />
      <CardContent sx={cardContentStyle}>
        {!mon && !otherMon ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="subtitle1" color="textSecondary">
              Select another Pokemon
            </Typography>
          </Grid>
        ) : (
          <Grid container gap={1} wrap="nowrap">
            <Grid item xs={6}>
              <MultiFusionGridItemSprite head={mon} body={otherMon} />
            </Grid>
            <Grid item xs={6}>
              <MultiFusionGridItemSprite head={otherMon} body={mon} />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
