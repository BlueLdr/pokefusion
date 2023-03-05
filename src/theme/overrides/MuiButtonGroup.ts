import type { ComponentsOverrides, Theme } from "@mui/material/styles";

export const MuiButtonGroup: ComponentsOverrides<Theme>["MuiButtonGroup"] = {
  root: ({ theme, ...props }) => ({
    "& .MuiInputBase-root:not(:last-child)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      "& fieldset": {
        borderRightWidth: 0,
      },
    },
    "& .MuiInputBase-root + .MuiButton-root": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }),
};
