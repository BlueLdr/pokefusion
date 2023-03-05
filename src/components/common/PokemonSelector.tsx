import { useCallback } from "react";

import { enumValues, getPokemonName } from "~/utils";
import { PokemonId } from "~/data";
import { VirtualizedListboxComponent } from "./VirtualizedListBox";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import type {
  AutocompleteRenderOptionState,
  AutocompleteProps,
} from "@mui/material/Autocomplete";
import type { TextFieldProps } from "@mui/material/TextField";

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
  onChange: (value: PokemonId) => void;
  fieldProps?: Partial<TextFieldProps>;
}

export const PokemonSelector: React.FC<PokemonSelectorProps> = ({
  onChange,
  fieldProps,
  value = null,
  ...props
}) => {
  const onChangeHandler = useCallback<
    NonNullable<AutocompleteProps<PokemonId, false, true, false>["onChange"]>
  >((e, value) => onChange(value), [onChange]);

  return (
    <Autocomplete<PokemonId, false, true, false>
      // @ts-expect-error: initial value = null to make the input controlled
      value={value}
      onChange={onChangeHandler}
      sx={{ maxWidth: theme => theme.spacing(64) }}
      {...props}
      disableClearable
      autoHighlight
      renderInput={params => <TextField {...params} {...(fieldProps ?? {})} />}
      options={options}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      ListboxComponent={VirtualizedListboxComponent}
      slotProps={{
        popper: {
          keepMounted: true,
        },
      }}
      componentsProps={{
        popper: {
          keepMounted: true,
        },
      }}
    />
  );
};
