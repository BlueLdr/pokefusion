import styled from "@emotion/styled";

import { IntroModal, Main } from "~/components";
import { Header } from "./Header";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

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
      </SiteContainer>
      <IntroModal />
    </Box>
  </>
);
