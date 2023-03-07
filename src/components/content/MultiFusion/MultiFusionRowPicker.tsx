import { useEffect, useState } from "react";

import { PokemonSelector } from "~/components";
import { getPokemonName } from "~/utils";

import type { PokemonMeta, PokemonId } from "~/data";
import type { TextFieldProps } from "@mui/material/TextField";

//================================================

interface MultiFusionRowPickerProps {
  value?: PokemonMeta;
  setValue: (newValue: PokemonMeta) => void;
  onClear?: () => void;
  fieldProps?: Partial<TextFieldProps>;
}

export const MultiFusionRowPicker: React.FC<MultiFusionRowPickerProps> = ({
  value,
  setValue,
  onClear,
  fieldProps,
}) => {
  const [id, setId] = useState<PokemonId>(value?.id as PokemonId);
  const [shiny, setShiny] = useState<boolean>(!!value?.shiny);

  /*const onChangeShiny = useCallback(
    (e: any, checked: boolean) => setShiny(checked),
    []
  );*/

  useEffect(() => {
    if (id == null) {
      onClear?.();
      return;
    }
    setValue({
      id,
      name: getPokemonName(id) ?? "???",
      shiny,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, shiny]);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (id !== value?.id) {
      setId(value.id);
    }
    if (shiny !== value?.shiny) {
      setShiny(!!value.shiny);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <PokemonSelector
      value={id}
      onChange={setId}
      fieldProps={{ variant: "filled", ...fieldProps }}
      disableClearable={onClear ? undefined : true}
    />
  );
};
