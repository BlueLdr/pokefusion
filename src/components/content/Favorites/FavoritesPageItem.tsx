import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { FavoritesButton } from "~/components";
import { getFusionNames } from "~/utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import Tooltip from "@mui/material/Tooltip";
import MuiLink from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import ImageRounded from "@mui/icons-material/ImageRounded";

import type { GridImageSize } from "./types";
import type { PokemonFusionMeta } from "~/data";
import type { StyleProps } from "~/theme";

//================================================

const gridImageSizeMapping: Record<GridImageSize, number> = {
  sm: 41,
  md: 64,
  lg: 88,
};

const getCardStyle = (size: GridImageSize): StyleProps => ({
  width: theme => theme.spacing(gridImageSizeMapping[size] + 4.5),
});

const cardHeaderStyle: StyleProps = {
  backgroundColor: theme => theme.palette.grey["900"],
  paddingTop: theme => theme.spacing(2),
  paddingBottom: theme => theme.spacing(2),
  "& .MuiCardHeader-subheader": {
    lineHeight: 2,
  },
  "& .MuiCardHeader-action": {
    marginTop: "auto",
    marginBottom: "auto",
  },
};

const getCardContentStyle = (size: GridImageSize): StyleProps => ({
  width: theme => theme.spacing(gridImageSizeMapping[size] + 4),
  height: theme => theme.spacing(gridImageSizeMapping[size] + 4),
  "&, &:last-child": {
    padding: theme => theme.spacing(2),
  },
  position: "relative",
});

const ImgContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  margin: auto;
`;

const SpriteImg = styled("img", {
  shouldForwardProp: prop => isPropValid(prop) && prop !== "$size",
})`
  max-height: 100%;
  max-width: 100%;

  ${({
    theme,
    // @ts-expect-error: custom prop
    $size = "md",
  }) => {
    const size = theme.spacing(gridImageSizeMapping[$size as GridImageSize]);
    return `
      height: ${size};
      width: ${size};
    `;
  }};

  object-fit: contain;
`;

const linkStyle: StyleProps = {
  "&:not(:hover):not(.Mui-focusVisible):not(:focus)": {
    color: "inherit",
    textDecoration: "none",
  },
};

const customSpriteIndicatorStyle: StyleProps = {
  marginRight: theme => theme.spacing(2),
  "& .MuiChip-icon": {
    margin: theme => `0 ${theme.spacing(1)}`,
    ".MuiChip-sizeSmall&": {
      margin: theme => `0 ${theme.spacing(0.75)}`,
    },
  },
  "& .MuiChip-label": {
    display: "none",
  },
};

//================================================

export const FavoritesPageItem: React.FC<{
  meta: PokemonFusionMeta;
  size: GridImageSize;
}> = ({ meta, size }) => {
  const href = `/${meta.fusionId}`;
  const names = getFusionNames(meta.head, meta.body);
  const namesSplit = names.split(" / ");

  const customSpriteIndicator = (
    <Tooltip title="Custom Sprite">
      <Chip
        sx={customSpriteIndicatorStyle}
        icon={<ImageRounded />}
        label=""
        color="success"
        size={size === "sm" ? "small" : undefined}
      />
    </Tooltip>
  );

  const image = (
    <MuiLink component={Link} to={href}>
      <SpriteImg
        src={meta?.sprite?.src}
        alt={getFusionNames(meta.head, meta.body)}
        className={meta && !meta.sprite?.src ? "invisible" : undefined}
        // @ts-expect-error: for styling only
        $size={size}
      />
    </MuiLink>
  );

  return (
    <Card component={ImageListItem} sx={getCardStyle(size)}>
      <CardHeader
        title={
          <MuiLink component={Link} to={href} sx={linkStyle}>
            {size === "sm" ? (
              <Box
                display="flex"
                sx={{ flexDirection: "column", flexWrap: "nowrap" }}
              >
                {namesSplit[0]}
                <br />
                {namesSplit[1]}
              </Box>
            ) : (
              names
            )}
          </MuiLink>
        }
        subheader={size === "sm" ? undefined : `Id: ${meta.fusionId}`}
        sx={cardHeaderStyle}
        titleTypographyProps={{
          variant: size === "sm" ? "body2" : "body1",
          component: Grid,
          container: true,
          wrap: "nowrap",
          alignItems: "center",
          display: "flex",
        }}
        subheaderTypographyProps={{
          variant: "overline",
        }}
        action={
          <>
            {meta?.sprite?.isCustom && size !== "sm" && customSpriteIndicator}
            <FavoritesButton fusion={meta} />
          </>
        }
      />
      <CardContent sx={getCardContentStyle(size)}>
        <ImgContainer container justifyContent="center">
          {size === "sm" && meta.sprite?.isCustom ? (
            <Badge variant="dot" color="success">
              {image}
            </Badge>
          ) : (
            image
          )}
        </ImgContainer>
      </CardContent>
    </Card>
  );
};
