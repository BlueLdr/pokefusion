import styled from "@emotion/styled";
import { useCallback, useMemo } from "react";

import { enumValues, getPokemonName } from "~/utils";
import { POKEMON_COUNT, PokemonId } from "~/data";
import { VirtualizedListboxComponent } from "./VirtualizedListBox";

import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import type {
  AutocompleteRenderOptionState,
  AutocompleteProps,
} from "@mui/material/Autocomplete";
import type { TextFieldProps } from "@mui/material/TextField";

//================================================

const StyledTextField = styled(TextField)`
  width: 100%;
  flex: 1 1 100%;
  max-width: ${({ theme }) => theme.spacing(64)};
  // width: ${({ theme }) => theme.spacing(40)};
  // ${({ theme }) => theme.breakpoints.up("md")} {
  //   width: ${({ theme }) => theme.spacing(64)};
  }
`;

//================================================

const options = enumValues(PokemonId);
const getOptionLabel = (id: PokemonId) =>
  id ? getPokemonName(id) ?? "???" : "";

const renderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: PokemonId,
  state: AutocompleteRenderOptionState
): React.ReactNode => [props, option, state] as any;

//================================================

interface PokemonSelectorProps
  extends Omit<
    AutocompleteProps<PokemonId, false, true, false>,
    "options" | "onChange" | "renderInput"
  > {
  onChange: React.Dispatch<React.SetStateAction<PokemonId>>;
  fieldProps?: Partial<TextFieldProps>;
  disablePrevNextButtons?: boolean;
}

export const PokemonSelector: React.FC<PokemonSelectorProps> = ({
  onChange,
  fieldProps,
  value = null,
  disablePrevNextButtons,
  ...props
}) => {
  const onChangeHandler = useCallback<
    NonNullable<AutocompleteProps<PokemonId, false, true, false>["onChange"]>
  >((e, value) => onChange(value), [onChange]);

  const onClickPrevious = useCallback(() => {
    onChange(prevId => (!!prevId && prevId > 1 ? prevId - 1 : prevId));
  }, [onChange]);

  const onClickNext = useCallback(() => {
    onChange(prevId =>
      !!prevId && prevId < POKEMON_COUNT ? prevId + 1 : prevId
    );
  }, [onChange]);

  const { prev, next } = useMemo(() => {
    if (!value || disablePrevNextButtons) {
      return { prev: "", next: "" };
    }
    return {
      prev: value > 1 ? `${value - 1}. ${getPokemonName(value - 1)}` : "",
      next:
        value < POKEMON_COUNT
          ? `${value + 1}. ${getPokemonName(value + 1)}`
          : "",
    };
  }, [value, disablePrevNextButtons]);

  const picker = (
    <Autocomplete<PokemonId, false, true, false>
      key="picker"
      // @ts-expect-error: initial value = null to make the input controlled
      value={value}
      onChange={onChangeHandler}
      disableClearable
      {...props}
      autoHighlight
      renderInput={params => (
        <StyledTextField {...params} label={value} {...(fieldProps ?? {})} />
      )}
      options={options}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      ListboxComponent={VirtualizedListboxComponent}
      slotProps={{
        popper: {
          keepMounted: true,
          sx: { minWidth: theme => theme.spacing(60) },
        },
      }}
      componentsProps={{
        popper: {
          keepMounted: true,
          sx: { minWidth: theme => theme.spacing(60) },
        },
      }}
    />
  );

  if (disablePrevNextButtons) {
    return picker;
  }
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      wrap="nowrap"
    >
      <Grid item>
        <Tooltip title={prev}>
          <IconButton
            disabled={!value || value === 1}
            onClick={onClickPrevious}
            disableRipple={false}
          >
            <KeyboardArrowLeftRounded />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item flex="1 1 100%" sx={{ maxWidth: theme => theme.spacing(64) }}>
        {picker}
      </Grid>
      <Grid item>
        <Tooltip title={next}>
          <IconButton
            disabled={!value || value === POKEMON_COUNT}
            onClick={onClickNext}
            disableRipple={false}
          >
            <KeyboardArrowRightRounded />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
