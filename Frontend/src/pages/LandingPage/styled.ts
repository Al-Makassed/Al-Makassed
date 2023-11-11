import { styled } from "@mui/material/styles";
import Grid, { GridProps } from "@mui/material/Grid";

export const Container = styled(Grid)<GridProps>(({ theme }) => ({
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.grey[100],
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
