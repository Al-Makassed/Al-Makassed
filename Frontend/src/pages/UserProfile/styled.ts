import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: 12,
  padding: theme.spacing(0.3, 1.5),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    bgcolor: theme.palette.grey[500],
  },
}));
