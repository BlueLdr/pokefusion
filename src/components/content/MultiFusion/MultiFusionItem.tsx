import styled from "@emotion/styled";

import { FavoritesButton } from "~/components";
import { useFusionMeta } from "~/utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import ImageRounded from "@mui/icons-material/ImageRounded";

import type { StyleProps } from "~/theme";
import type { PokemonFusionViewProps } from "~/components";

//================================================

const placeholderSrc = "question.png";

const cardContentStyle: StyleProps = {
  "&, &:last-child": {
    padding: theme => theme.spacing(2),
  },
  position: "relative",
};

const ImgContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  margin: auto;
`;

const SpriteImg = styled.img`
  height: ${({ src }) => (src === placeholderSrc ? "auto" : "100%")};
  max-width: ${({ src }) => (src === placeholderSrc ? "auto" : "100%")};
  max-height: ${({ theme }) => theme.spacing(36)};
  ${({ theme }) => theme.breakpoints.up("lg")} {
  }
  object-fit: contain;
  &.invisible {
    visibility: hidden;
  }
`;

const CustomSpriteIndicatorContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(4)};
  right: ${({ theme }) => theme.spacing(4)};
  & .MuiChip-root .MuiChip-icon {
    margin: 0 ${({ theme }) => theme.spacing(1)};
  }
  & .MuiChip-root .MuiChip-label {
    display: none;
  }
`;

//================================================

export const MultiFusionItem: React.FC<PokemonFusionViewProps> = ({
  head,
  body,
}) => {
  const fusionMeta = useFusionMeta(head, body, placeholderSrc);

  return (
    <Card>
      <CardHeader
        sx={{
          backgroundColor: theme => theme.palette.grey["900"],
          paddingTop: theme => theme.spacing(2),
          paddingBottom: theme => theme.spacing(2),
        }}
        titleTypographyProps={{
          variant: "body2",
          component: Grid,
          container: true,
          wrap: "nowrap",
          alignItems: "center",
          display: "flex",
        }}
        title={
          <>
            {`${head?.name ?? "???"}${head?.shiny ? ` ✨` : ""} / ${
              body?.name ?? "???"
            }${body?.shiny ? ` ✨` : ""}`}
            {fusionMeta && (
              <Box ml={2} my={-2}>
                <FavoritesButton fusion={fusionMeta} />
              </Box>
            )}
          </>
        }
      />
      <CardContent sx={cardContentStyle}>
        <ImgContainer container justifyContent="center">
          <SpriteImg
            src={fusionMeta?.sprite?.src ?? placeholderSrc}
            className={
              fusionMeta && !fusionMeta.sprite?.src ? "invisible" : undefined
            }
          />
        </ImgContainer>
        {fusionMeta?.sprite?.isCustom && (
          <CustomSpriteIndicatorContainer>
            <Tooltip title="Custom Sprite">
              <Chip icon={<ImageRounded />} label="" color="success" />
            </Tooltip>
          </CustomSpriteIndicatorContainer>
        )}
      </CardContent>
    </Card>
  );
};
