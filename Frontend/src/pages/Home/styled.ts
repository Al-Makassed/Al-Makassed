import { styled } from "@mui/material/styles";
import Grid, { GridProps } from "@mui/material/Grid";

export const HomeContainer = styled(Grid)<GridProps>(({ theme }) => ({
  padding: theme.spacing(3, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
