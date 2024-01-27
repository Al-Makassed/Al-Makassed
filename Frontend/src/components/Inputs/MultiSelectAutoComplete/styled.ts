import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const ShowMoreButton = styled(Box, {
  name: "ShowMoreButton",
})<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 32,
  width: 32,
  cursor: "pointer",
  fontSize: theme.typography.pxToRem(14),
  backgroundColor: `${theme.palette.grey[600]}`,
  borderRadius: "50%",
  color: "white",
  textAlign: "start",
}));
