import type { GridProps, GridTypeMap } from "@mui/material/Grid";

export type SpacedGridProps<
  D extends React.ElementType = GridTypeMap["defaultComponent"],
  // eslint-disable-next-line @typescript-eslint/ban-types
  P = {}
> = GridProps<D, P> & {
  disableOrthogonalSpacing?: boolean;
};
