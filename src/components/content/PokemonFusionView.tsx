import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { PokemonId } from "~/data";
import { getFusionSprite } from "~/utils";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import Box from "@mui/material/Box";

import type { FusionSprite, PokemonMeta } from "~/data";

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
  const [fusionSprite, setFusionSprite] = useState<FusionSprite>({
    id: "",
    src: placeholderSrc,
    isCustom: false,
  });

  const headId = head?.id;
  const bodyId = body?.id;
  const selectionsAreValid =
    headId && PokemonId[headId] != null && bodyId && PokemonId[bodyId] != null;
  useEffect(() => {
    if (selectionsAreValid) {
      getFusionSprite(headId, bodyId).then(sprite => setFusionSprite(sprite));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headId, bodyId]);

  return (
    <Card variant="elevation">
      {selectionsAreValid && (
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
                <strong>Fusion ID</strong>: {head.id}.{body.id}
              </Box>
              <Box component="span">
                <strong>Fusion Dex #</strong>: {head.id + body.id * 420}
              </Box>
            </>
          }
          action={
            <Grid container justifyContent="flex-end" alignItems="center">
              {fusionSprite.isCustom && <Chip label="Custom Sprite" />}
              <Tooltip title="Add to favorites (feature coming soon!)">
                <IconButton>
                  <StarOutlineRounded />
                </IconButton>
              </Tooltip>
            </Grid>
          }
        />
      )}
      <CardContent>
        <ImgContainer container justifyContent="center">
          <SpriteImg src={fusionSprite.src} />
        </ImgContainer>
      </CardContent>
    </Card>
  );
};
