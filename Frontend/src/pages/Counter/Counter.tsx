import React, { FC } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "src/features/counter";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

const Counter: FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(5));

  return (
    <Grid
      container
      sx={{ bgcolor: "grey.200", height: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Stack gap={2} direction="row">
          <Button aria-label="Increment value" onClick={handleIncrement}>
            Increment
          </Button>
          <Button
            aria-label="Increment value"
            onClick={handleIncrementByAmount}
          >
            Increment by 5
          </Button>
          <Typography variant="h2">{count}</Typography>
          <Button aria-label="Decrement value" onClick={handleDecrement}>
            Decrement
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Counter;
