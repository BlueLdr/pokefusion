import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Footer: React.FC = () => (
  <Grid
    container
    component="footer"
    alignItems="center"
    justifyContent="center"
    mt={4}
  >
    <Typography color="textSecondary" variant="button">
      Made by{" "}
      <Button
        component="a"
        sx={{ margin: theme => theme.spacing(-0.5, -2, 0) }}
        href="https://github.com/BlueLdr/pokefusion/"
        target="_blank"
      >
        BlueLdr
      </Button>
      , forked from{" "}
      <Button
        component="a"
        sx={{ margin: theme => theme.spacing(-0.5, -2, 0) }}
        href="https://github.com/Aegide/Aegide.github.io"
        target="_blank"
      >
        Aegide.github.io
      </Button>
    </Typography>
  </Grid>
);
