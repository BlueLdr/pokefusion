import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { getPokemonName, getRandomPokeID, useStateObject } from "~/utils";
import { SpacedGrid } from "~/components";
import { PokemonFusionView } from "./PokemonFusionView";
import { PokemonFusionPicker } from "./PokemonFusionPicker";

import Button from "@mui/material/Button";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { StyleProps } from "~/theme";
import type { WithChildren } from "~/utils";
import type { PokemonMeta } from "~/data";

//================================================

const columnItemInnerStyle: StyleProps = {
  minWidth: "100%",
  display: "inline-flex",
  justifyContent: "center",
  "& > *": {
    flex: "1 1 100%",
  },
};

const ColumnItem: React.FC<WithChildren> = ({ children }) => (
  <Grid item xs={12} sm={6}>
    <Box sx={columnItemInnerStyle}>{children}</Box>
  </Grid>
);
ColumnItem.displayName = "ColumnItem";

//================================================

interface SelectionState {
  left?: PokemonMeta;
  right?: PokemonMeta;
}

//================================================

export const Main: React.FC = () => {
  const { hash: hashRaw } = useLocation();
  const hash = useMemo(() => hashRaw.replace(/^#/, ""), [hashRaw]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialState = useMemo<SelectionState>(() => {
    const [leftId, rightId] = hash.split(".");
    if (
      !leftId ||
      isNaN(Number(leftId)) ||
      !rightId ||
      isNaN(Number(rightId))
    ) {
      return {
        left: undefined,
        right: undefined,
      };
    }
    return {
      left: {
        id: Number(leftId),
        name: getPokemonName(Number(leftId)) ?? "???",
        shiny: Boolean(searchParams.get("leftShiny")),
      },
      right: {
        id: Number(rightId),
        name: getPokemonName(Number(rightId)) ?? "???",
        shiny: Boolean(searchParams.get("rightShiny")),
      },
    };
  }, [hash, searchParams]);

  const [{ left: pokemonLeft, right: pokemonRight }, setState] =
    useStateObject<SelectionState>(initialState);

  const setPokemonLeft = useCallback(
    (meta: PokemonMeta) => setState({ left: meta }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const setPokemonRight = useCallback(
    (meta: PokemonMeta) => setState({ right: meta }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onClickSwap = useCallback(
    () => setState(({ left, right }) => ({ left: right, right: left })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onClickRandomize = useCallback(() => {
    navigate({ hash: `${getRandomPokeID()}.${getRandomPokeID()}` });
  }, [navigate]);

  const componentLocation = useMemo(() => {
    const componentHash =
      !!pokemonLeft && !!pokemonRight
        ? `${pokemonLeft?.id}.${pokemonRight?.id}`
        : undefined;
    const params = new URLSearchParams();
    if (!componentHash) {
      return { search: params };
    }
    if (pokemonLeft?.shiny) {
      params.set("leftShiny", "true");
    }
    if (pokemonRight?.shiny) {
      params.set("rightShiny", "true");
    }
    return {
      hash: componentHash,
      search: params,
    };
  }, [pokemonLeft, pokemonRight]);

  useEffect(() => {
    console.log(`componentLocation: `, componentLocation, hash, searchParams);
    if (
      (!!componentLocation.hash && componentLocation.hash !== hash) ||
      componentLocation.search.toString() !== searchParams.toString()
    ) {
      navigate({
        hash: componentLocation.hash,
        search: componentLocation.search.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentLocation]);

  useEffect(() => {
    console.log(`hash, searchParams: `, hash, searchParams, componentLocation);
    if (
      componentLocation.hash !== hash ||
      componentLocation.search.toString() !== searchParams.toString()
    ) {
      setState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, searchParams]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      flex="1 0 100%"
      mt={8}
    >
      <Grid container alignItems="center" spacing={6} wrap="nowrap">
        <ColumnItem>
          <PokemonFusionPicker
            pokemon={pokemonLeft}
            setPokemon={setPokemonLeft}
            fieldProps={{
              label: pokemonLeft ? pokemonLeft.id : "Pokemon 1",
            }}
          />
        </ColumnItem>
        <Grid
          flex="0 0 0"
          sx={{
            width: 0,
            paddingTop: theme => theme.spacing(6),
          }}
        >
          <SpacedGrid
            direction="column"
            spacing={4}
            justifyContent="center"
            alignItems="center"
            sx={{
              transform: theme =>
                `translateX(calc(-50% + ${theme.spacing(3)}))`,
              width: "fit-content",
              marginLeft: 0,
              marginRight: 0,
              "& > .MuiGrid-item": {
                paddingLeft: 0,
                paddingRight: 0,
              },
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{ height: theme => theme.spacing(14) }}
            >
              <Tooltip title="Swap Pokemon" placement="top">
                <IconButton
                  onClick={onClickSwap}
                  size="large"
                  disableRipple={false}
                >
                  <SwapHorizRounded />
                </IconButton>
              </Tooltip>
            </Grid>
            <Button
              onClick={onClickRandomize}
              variant="outlined"
              endIcon={<ShuffleRounded />}
            >
              Randomize
            </Button>
          </SpacedGrid>
        </Grid>
        <ColumnItem>
          <PokemonFusionPicker
            pokemon={pokemonRight}
            setPokemon={setPokemonRight}
            fieldProps={{
              label: pokemonRight ? pokemonRight.id : "Pokemon 2",
            }}
          />
        </ColumnItem>
      </Grid>
      <Grid container alignItems="center" mt={4} spacing={6}>
        <ColumnItem>
          <PokemonFusionView head={pokemonLeft} body={pokemonRight} />
        </ColumnItem>
        <ColumnItem>
          <PokemonFusionView head={pokemonRight} body={pokemonLeft} />
        </ColumnItem>
      </Grid>
    </Grid>
  );
};
