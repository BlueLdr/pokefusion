import type { ComponentsOverrides, Theme } from "@mui/material/styles";

export const MuiCssBaseline: ComponentsOverrides<Theme>["MuiCssBaseline"] =
  theme => `
    button.Mui-focusVisible, a.Mui-focusVisible {
      outline: 1px solid ${theme.palette.primary.dark};
    }
`;
