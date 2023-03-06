import styled from "@emotion/styled";

import { PokemonFusionData } from "./PokemonFusionData";
import { useFusionMeta } from "~/utils";
import { FavoritesButton } from "./FavoritesButton";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import type { PokemonMeta } from "~/data";

//================================================

const placeholderSrc = "question.png";

const ImgContainer = styled(Grid)`
  width: ${({ theme }) => theme.spacing(100)};
  height: ${({ theme }) => theme.spacing(100)};
  margin: auto;
`;

const SpriteImg = styled.img`
  width: ${({ src }) => (src === placeholderSrc ? "auto" : "100%")};
  height: ${({ src }) => (src === placeholderSrc ? "auto" : "100%")};
  object-fit: contain;
  &.invisible {
    visibility: hidden;
  }
`;

//================================================

interface PokemonFusionViewProps {
  head?: PokemonMeta;
  body?: PokemonMeta;
}

export const PokemonFusionView: React.FC<PokemonFusionViewProps> = ({
  head,
  body,
}) => {
  const fusionMeta = useFusionMeta(head, body, placeholderSrc);

  return (
    <Card variant="elevation">
      {fusionMeta && (
        <CardHeader
          title={`${head?.name}${head?.shiny ? ` ✨` : ""} / ${body?.name}${
            body?.shiny ? ` ✨` : ""
          }`}
          subheaderTypographyProps={{
            variant: "overline",
          }}
          subheader={
            <>
              <Box component="span" mr={4}>
                <strong>Fusion ID</strong>: {fusionMeta?.fusionId}
              </Box>
              <Box component="span">
                <strong>Fusion Dex #</strong>: {fusionMeta?.fusionDexId}
              </Box>
            </>
          }
          action={
            <Grid container justifyContent="flex-end" alignItems="center">
              {fusionMeta.sprite?.isCustom && (
                <Chip color="success" label="Custom Sprite" />
              )}
              <FavoritesButton fusion={fusionMeta} />
            </Grid>
          }
        />
      )}
      <CardContent>
        <ImgContainer container justifyContent="center">
          <SpriteImg
            src={fusionMeta?.sprite?.src ?? placeholderSrc}
            className={
              fusionMeta && !fusionMeta.sprite?.src ? "invisible" : undefined
            }
          />
        </ImgContainer>
      </CardContent>
      {fusionMeta && (
        <CardActionArea>
          <PokemonFusionData meta={fusionMeta} />
        </CardActionArea>
      )}
    </Card>
  );
};
