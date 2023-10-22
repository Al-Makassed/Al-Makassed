import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1.5),
  height: "40px",
//   ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));
