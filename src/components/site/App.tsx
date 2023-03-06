import styled from "@emotion/styled";

import { IntroModal, Main } from "~/components";
import { Header } from "./Header";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

//================================================

const SiteContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;
SiteContainer.displayName = "styled(SiteContainer)";

const Body = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  box-sizing: border-box;
  & > .pending-view,
  & > * > .pending-view {
    min-height: ${({ theme }) => theme.spacing(120)};
  }
`;
Body.displayName = "Body";

export const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <CssBaseline />
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <SiteContainer flexGrow={1}>
        <Header />
        <Container component={Body}>
          <Main />
        </Container>
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
      </SiteContainer>
      <IntroModal />
    </Box>
  </>
);
