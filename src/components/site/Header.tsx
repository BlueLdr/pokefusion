import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header: React.FC = () => (
  <AppBar id="site-header" position="relative">
    <Toolbar>
      <Container>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4">Infinite Fusion Playground</Typography>
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  </AppBar>
);
