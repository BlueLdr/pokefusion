import { useCallback, useEffect, useMemo, useState } from "react";

import { getPokemonName, loadStorage, setStorage } from "~/utils";
import { PokemonSelector } from "~/components";
import { DEFAULT_PRESET_LIST } from "./constants";
import { MultiFusionGridItem } from "./MultiFusionGridItem";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import ClearRounded from "@mui/icons-material/ClearRounded";
import IconButton from "@mui/material/IconButton";

import type { PokemonId, PokemonMeta } from "~/data";

//================================================

interface MultiFusionState {
  otherMon: PokemonId;
  list: PokemonMeta[];
}

interface MultiFusionPreset {
  name: string;
  list: PokemonMeta[];
}

const MULTI_FUSION_STATE_STORAGE_KEY = "multi-fusion-state";
const MULTI_FUSION_PRESETS_STORAGE_KEY = "multi-fusion-presets";

//================================================

export const MultiFusionPage: React.FC = () => {
  const initialState = useMemo(
    () => loadStorage<MultiFusionState>(MULTI_FUSION_STATE_STORAGE_KEY),
    []
  );
  const initialPresets = useMemo(
    () => loadStorage<MultiFusionPreset[]>(MULTI_FUSION_PRESETS_STORAGE_KEY),
    []
  );

  const [otherMonValue, setOtherMonValue] = useState<PokemonId>(
    initialState?.otherMon as PokemonId
  );

  const otherMon = useMemo(
    () =>
      otherMonValue
        ? {
            id: otherMonValue,
            name: getPokemonName(otherMonValue) ?? "???",
            shiny: false,
          }
        : undefined,
    [otherMonValue]
  );

  const [preset, setPreset] = useState<string>("");
  const [presetList] = useState(initialPresets ?? DEFAULT_PRESET_LIST);
  const [list, setList] = useState<PokemonMeta[]>(initialState?.list ?? []);

  const onAddRow = useCallback((_: any, value: PokemonMeta) => {
    setList(curList =>
      curList.find(item => item.id === value.id)
        ? curList
        : [
            ...curList,
            {
              id: value.id,
              name: getPokemonName(value.id) ?? "???",
              shiny: false,
            },
          ]
    );
  }, []);

  const onEditRow = useCallback((oldId: PokemonId, value: PokemonMeta) => {
    setList(curList => {
      const index = curList.findIndex(item => item.id === oldId);
      if (index < 0) {
        return curList;
      }
      return curList.map((item, i) => (i === index ? value : item));
    });
  }, []);

  const onRemoveRow = useCallback((id: PokemonId) => {
    setList(curList => {
      if (!curList.find(item => item.id === id)) {
        return curList;
      }
      return curList.filter(item => item.id !== id);
    });
  }, []);

  const onSelectPreset = useCallback((e: any) => {
    setPreset(e.target.value);
  }, []);

  useEffect(() => {
    setStorage(MULTI_FUSION_STATE_STORAGE_KEY, {
      otherMon: otherMonValue,
      list,
    });
  }, [otherMonValue, list]);

  useEffect(() => {
    if (list.length === 0 && !preset) {
      setPreset(presetList[0]?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selected = presetList.find(p => p.name === preset);
    if (selected) {
      setList(selected.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  useEffect(() => {
    const selected = presetList.find(p => p.name === preset);
    if (JSON.stringify(list) !== JSON.stringify(selected?.list)) {
      setPreset("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  useEffect(() => {
    setStorage(MULTI_FUSION_PRESETS_STORAGE_KEY, presetList);
  }, [presetList]);

  return (
    <Grid container direction="column">
      <Toolbar
        component={Grid}
        container
        alignItems="center"
        sx={{
          backgroundColor: theme => theme.palette.grey["900"],
          position: "sticky",
          top: 0,
          zIndex: theme => theme.zIndex.appBar,
          marginBottom: theme => theme.spacing(4),
        }}
      >
        <Container>
          <Grid container alignItems="center" minHeight="100%">
            <Grid
              item
              xs={5}
              sm={4}
              md={3}
              container
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <FormControl>
                  <InputLabel>Preset</InputLabel>
                  <Select
                    onChange={onSelectPreset}
                    value={preset}
                    label="Preset"
                    placeholder="Preset"
                    displayEmpty
                    sx={{
                      minWidth: theme => theme.spacing(48),
                    }}
                  >
                    {presetList.map(item => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item ml={4}>
                <Tooltip title="Clear list">
                  <IconButton
                    disableRipple={false}
                    onClick={() => {
                      setList([]);
                      setPreset("");
                    }}
                  >
                    <ClearRounded />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={7} sm={8} md={9}>
              <PokemonSelector
                value={otherMonValue}
                onChange={setOtherMonValue}
                size="small"
                fieldProps={{
                  label: otherMonValue
                    ? otherMonValue
                    : "Select a Pokemon to fuse",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <Container>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          {list.map((row, i) => (
            <Grid item xs={12} md={6} lg={4}>
              <MultiFusionGridItem
                key={i}
                mon={row}
                onChangeMon={onEditRow}
                onRemove={onRemoveRow}
                otherMon={otherMon}
              />
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={4}>
            <MultiFusionGridItem key={list.length} onChangeMon={onAddRow} />
          </Grid>
        </Grid>
        {/*
        <SpacedGrid direction="column" spacing={4} mt={0}>
          {list.map((row, i) => (
            <MultiFusionRow
              key={i}
              rowMon={row}
              otherMon={otherMon}
              onChangeRowMon={onEditRow}
              onRemove={onRemoveRow}
            />
          ))}
          <MultiFusionRow key={list.length} onChangeRowMon={onAddRow} />
        </SpacedGrid>*/}
      </Container>
    </Grid>
  );
};
