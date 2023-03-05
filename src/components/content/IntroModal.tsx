import { loadStorage, useModalToggle } from "~/utils";
import { Modal } from "~/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import type { StyleProps } from "~/theme";

const INTRO_VIEWED_KEY = "intro-viewed";
const introViewed = Boolean(loadStorage(INTRO_VIEWED_KEY));

//================================================

const listStyle: StyleProps = {
  listStyle: "initial",
  "& li": {
    display: "list-item",
    listStylePosition: "inside",
  },
};

//================================================

export const IntroModal: React.FC = () => {
  const [open, , closeModal] = useModalToggle(!introViewed);

  if (introViewed) {
    return null;
  }
  return (
    <Modal
      id="intro-modal"
      open={open}
      onClose={closeModal}
      titleText="
        Welcome to Infinite Fusion Playground!"
    >
      <Typography paragraph>
        Here are some tips to help you get started!
      </Typography>

      <List sx={listStyle}>
        <ListItem>
          Use browser navigation (forward/back buttons) to see previous fusions.
        </ListItem>
        <ListItem>
          Click the arrow buttons next to the Pokemon name inputs to go to the
          next Pokemon in the PokeDex. Use this to "evolve" your fusions!
        </ListItem>
        <ListItem>
          Add fusions to Favorites, then load them from the Favorites list at
          any time.
        </ListItem>
      </List>
    </Modal>
  );
};
