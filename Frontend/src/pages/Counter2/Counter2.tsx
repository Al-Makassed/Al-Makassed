import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import useCounterContext from "./context/useCounter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Counter2: FC = () => {
  const {
    state: { count, text },
    increment,
    decrement,
    handleTextInput,
  } = useCounterContext();

  return (
    <Grid
      container
      sx={{ bgcolor: "grey.200", height: "100vh" }}
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={2}
    >
      <Grid item>
        <Stack gap={2} direction="row">
          <Button
            startIcon={<AddIcon />}
            aria-label="Increment value"
            onClick={increment}
          >
            Increment
          </Button>
          <Typography variant="h2">{count}</Typography>
          <Button
            startIcon={<RemoveIcon />}
            aria-label="Decrement value"
            onClick={decrement}
          >
            Decrement
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <Typography variant="h6">{text}</Typography>
        <TextField label="What's going on" onChange={handleTextInput} />
      </Grid>
    </Grid>
  );
};

export default Counter2;
