import type { ComponentsOverrides, Theme } from "@mui/material/styles";

export const MuiDialogTitle: ComponentsOverrides<Theme>["MuiDialogTitle"] = {
  root: ({ theme }) => ({
    lineHeight: "1.2em",
    padding: theme.spacing(3, 4),
    "& .modal-close": {
      margin: theme.spacing(-2, -2, -2, 0),
    },
  }),
};

export const MuiDialogActions: ComponentsOverrides<Theme>["MuiDialogActions"] =
  {
    root: ({ theme }) => ({
      padding: theme.spacing(0, 6, 4),
    }),
  };
