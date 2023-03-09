import { useCallback, useContext, useEffect, useState } from "react";

import { PageSection, SpacedGrid } from "~/components";
import { FavoritesContext } from "~/context";
import { loadStorage, setStorage } from "~/utils";
import { FavoritesPageItem } from "./FavoritesPageItem";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppsRounded from "@mui/icons-material/AppsRounded";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import ViewCompactRounded from "@mui/icons-material/ViewCompactRounded";

import type { GridImageSize } from "./types";

//================================================

interface FavoritesPageState {
  size: GridImageSize;
}

const FAVORITES_PAGE_STATE_STORAGE_KEY = "favorites-page-state";

const initialState = loadStorage<FavoritesPageState>(
  FAVORITES_PAGE_STATE_STORAGE_KEY,
  {
    size: "md",
  }
);

//================================================

const gridSpacingMap: Record<GridImageSize, number> = {
  sm: 4,
  md: 6,
  lg: 8,
};

//================================================

export const FavoritesPage: React.FC = () => {
  const { list } = useContext(FavoritesContext);
  const [size, setSize] = useState<GridImageSize>(initialState.size);

  const onChangeSize = useCallback(
    (e: any, newSize: GridImageSize) => !!newSize && setSize(newSize),
    []
  );

  useEffect(() => {
    setStorage(FAVORITES_PAGE_STATE_STORAGE_KEY, {
      size,
    });
  }, [size]);

  return (
    <PageSection item>
      <AppBar
        position="static"
        color="transparent"
        sx={{ marginBottom: theme => theme.spacing(gridSpacingMap[size]) }}
      >
        <Container>
          <Grid component={Toolbar} container justifyContent="space-between">
            <Typography variant="h5">Favorites</Typography>

            <ToggleButtonGroup exclusive onChange={onChangeSize} value={size}>
              <ToggleButton value="sm">
                <ViewCompactRounded />
              </ToggleButton>
              <ToggleButton value="md">
                <AppsRounded />
              </ToggleButton>
              <ToggleButton value="lg">
                <GridViewRounded />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Container>
      </AppBar>
      <Container>
        <SpacedGrid
          component="ul"
          container
          spacing={gridSpacingMap[size]}
          pl={0}
          width="auto"
        >
          {Array.from(list.entries()).map(([key, fusionMeta]) => (
            <FavoritesPageItem key={key} meta={fusionMeta} size={size} />
          ))}
        </SpacedGrid>
        {list.size === 0 && (
          <PageSection
            item
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6" color="textSecondary" my={8}>
              You have no saved favorites.
            </Typography>
          </PageSection>
        )}
      </Container>
    </PageSection>
  );
};
