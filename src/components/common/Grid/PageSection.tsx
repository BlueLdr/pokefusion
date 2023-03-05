import Grid from "@mui/material/Grid";

import type { GridProps, GridTypeMap } from "@mui/material/Grid";

//================================================

export const PageSection = <
  D extends React.ElementType = GridTypeMap["defaultComponent"],
  // eslint-disable-next-line @typescript-eslint/ban-types
  P = {}
>(
  props: GridProps<D, P>
) => (
  <Grid container direction="column" flex="1 1 100%" wrap="nowrap" {...props} />
);
