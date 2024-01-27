import Pagination, { PaginationProps } from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { StyledTableRowProps } from "./types";
import { Box, BoxProps } from "@mui/material";

export const ColumnResizer = styled(Box, {
  name: "ColumnResizer",
})<BoxProps>(({ theme }) => ({
  position: "absolute",
  right: 0,
  width: "4px",
  background: theme.palette.grey[300],
  top: 0,
  height: "100%",
  cursor: "col-resize",
  userSelect: "none",
  touchAction: "none",
  opacity: 0,
}));

export const StyledPagination = styled(Pagination, {
  name: "StyledPagination",
})<PaginationProps>(() => ({
  display: "flex",
  justifyContent: "center",
}));

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) =>
    !["isClickable", "striped"].includes(prop as string),
})<StyledTableRowProps>(({ theme, isClickable, striped }) => ({
  cursor: isClickable ? "pointer" : "default",
  ...(striped && {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f1f1f1",
    },
  }),
  ":hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));
