import { ListItemButton } from "@mui/material";
import { teal } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  border: "0.1rem solid",
  borderColor: theme.palette.grey[300],
  borderRadius: 15,
  minHeight: 70,
  ":hover": {
    backgroundColor: teal[50],
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));
