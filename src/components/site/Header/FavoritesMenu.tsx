import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FavoritesContext } from "~/context";
import { getRouteFromFusion } from "~/utils";

import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import StarRounded from "@mui/icons-material/StarRounded";

import type { MenuProps } from "@mui/material/Menu";
import type { StyleProps } from "~/theme";

//================================================

const paperStyle: StyleProps = {
  maxHeight: theme => theme.spacing(64),
};

const listStyle: StyleProps = {
  padding: theme => theme.spacing(2, 0),
};
const listItemStyle: StyleProps = {
  padding: theme => theme.spacing(3, 4),
};

const menuPosition: Partial<MenuProps> = {
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
};

//================================================

export const FavoritesMenu: React.FC = () => {
  const { list } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback(
    (fusion: any) => {
      const route = getRouteFromFusion(fusion);
      console.log(`route: `, route);
      navigate(route);
      setAnchorEl(null);
    },
    [navigate]
  );

  return (
    <>
      <Button startIcon={<StarRounded />} onClick={handleClick}>
        Favorites
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ sx: listStyle }}
        PaperProps={{ sx: paperStyle }}
        {...menuPosition}
      >
        {list.size === 0 && <MenuItem>You have no saved favorites.</MenuItem>}
        {Array.from(list.entries()).map(([key, fusion]) => (
          <MenuItem
            key={key}
            sx={listItemStyle}
            onClick={() => handleSelect(fusion)}
          >
            <Typography color="textSecondary" pr={3}>
              {key}
            </Typography>
            {fusion.head.name}
            {" / "}
            {fusion.body.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
