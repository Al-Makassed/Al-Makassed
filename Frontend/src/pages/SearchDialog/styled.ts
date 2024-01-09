import { ListItemButton } from "@mui/material";
import { teal } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
// import ArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  border: "0.1rem solid",
  borderColor: theme.palette.primary.main,
  borderRadius: 15,
  minHeight: 70,
  ":hover": {
    backgroundColor: teal[50],
    // color: "primary.main",
  },
}));
