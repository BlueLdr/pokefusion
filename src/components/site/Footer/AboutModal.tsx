import { Modal } from "~/components";

import Typography from "@mui/material/Typography";

import type { ModalProps } from "~/components";

//================================================

export const AboutModal: React.FC<Pick<ModalProps, "open" | "onClose">> = ({
  open,
  onClose,
}) => (
  <Modal
    id="about-modal"
    open={open}
    onClose={onClose}
    titleText="About this project"
  >
    <Typography>
      This project is a modern version of Aegide's Infinite Fusion Calculator,
      built on React and Material UI. The goal was to provide a nicer UI and add
      features that make it easier to preview fusions in bulk.
      <br />
      <br />
      Info from Aegide's site:
      <Typography
        component="blockquote"
        sx={{
          borderLeft: theme => `2px solid ${theme.palette.grey["600"]}`,
          paddingLeft: theme => theme.spacing(3),
          "& a": {
            color: theme => theme.palette.primary.main,
          },
          "& a:visited": {
            color: theme => theme.palette.primary.dark,
          },
        }}
        color="textSecondary"
      >
        <p>
          Only works with{" "}
          <a href="https://infinitefusion.fandom.com/wiki/Pokédex">
            natives mons available
          </a>{" "}
          in Pokémon Infinite Fusion v5 ! This project was created by{" "}
          <a href="https://twitter.com/SDM_0_">SDM0</a>, then maintained by{" "}
          <a href="https://github.com/Aegide">Aegide</a>. The data used is from
          the game, but is mostly based on generation 7.
        </p>
        <p>
          Custom sprites [...] are made by artists, from the{" "}
          <a href="https://discord.com/invite/2yynWRvBrB">
            Infinite Fusion Discord
          </a>{" "}
          and{" "}
          <a href="https://www.reddit.com/r/PokemonInfiniteFusion/">Reddit</a>.
        </p>
        <p>
          Generated sprites [...] are from{" "}
          <a href="https://japeal.com/pkm/">Japeal</a>. They were extracted and{" "}
          <a href="https://github.com/Aegide/autogen-fusion-sprites/commits/master/Battlers">
            fixed
          </a>{" "}
          by <a href="https://github.com/Aegide">Aegide</a>.
        </p>
      </Typography>
    </Typography>
  </Modal>
);
