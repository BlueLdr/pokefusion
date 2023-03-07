import { Link } from "react-router-dom";

import { SpacedGrid } from "~/components";
import { FavoritesMenu } from "./FavoritesMenu";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CatchingPokemon from "@mui/icons-material/CatchingPokemon";
import BallotRounded from "@mui/icons-material/BallotRounded";

//================================================

export const Header: React.FC = () => {
  return (
    <AppBar id="site-header" position="relative">
      <Container>
        <Toolbar>
          {
            // @ts-expect-error: edge prop handled by toolbar
            <Grid container alignItems="center" edge="start">
              <Grid item>
                <Typography variant="h4">Infinite Fusion Playground</Typography>
              </Grid>
            </Grid>
          }
          {
            <SpacedGrid
              spacing={4}
              alignItems="center"
              justifyContent="flex-end"
              edge="end"
            >
              <Button component={Link} to="/" startIcon={<CatchingPokemon />}>
                Single Fusion
              </Button>
              <Button
                component={Link}
                to="/multi"
                startIcon={<BallotRounded />}
              >
                Multi Fusion
              </Button>
              <FavoritesMenu />
            </SpacedGrid>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
