import { SpacedGrid } from "~/components";
import { useModalToggle } from "~/utils";
import { AboutModal } from "./AboutModal";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import type { ButtonProps } from "@mui/material/Button";

const buttonLinkProps: ButtonProps<"a"> & { component: "a" } = {
  component: "a",
  sx: { margin: theme => theme.spacing(-0.5, -2, 0) },
  target: "_blank",
};

//================================================

export const Footer: React.FC = () => {
  const [open, openModal, closeModal] = useModalToggle();
  return (
    <SpacedGrid
      component="footer"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      mt={0}
    >
      <Typography color="textSecondary" variant="button">
        Made by{" "}
        <Button
          {...buttonLinkProps}
          href="https://github.com/BlueLdr/pokefusion/"
        >
          BlueLdr
        </Button>
        , forked from{" "}
        <Button
          {...buttonLinkProps}
          href="https://github.com/Aegide/Aegide.github.io"
        >
          Aegide.github.io
        </Button>
      </Typography>
      <Typography color="textSecondary">|</Typography>
      <Button sx={buttonLinkProps.sx} onClick={openModal}>
        About this project
      </Button>
      <Typography color="textSecondary">
        |
        <AboutModal open={open} onClose={closeModal} />
      </Typography>
      <Button
        {...buttonLinkProps}
        href="https://github.com/BlueLdr/pokefusion/issues/new?template=feature_request.md"
      >
        Give Feedback
      </Button>
      <Typography color="textSecondary">|</Typography>
      <Button
        {...buttonLinkProps}
        href="https://github.com/BlueLdr/pokefusion/issues/new?template=bug_report.md"
      >
        Report an Issue
      </Button>
    </SpacedGrid>
  );
};
