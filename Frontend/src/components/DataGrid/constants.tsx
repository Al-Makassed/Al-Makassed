import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SxProps } from "@mui/material";
import { SortDirection } from "@tanstack/react-table";
import { ReactNode } from "react";

const sortIconStyle: SxProps = {
  fontSize: 18,
  color: "rgba(0,0,0,0.6)",
};

export const mapSortDirToIcon: Record<SortDirection, ReactNode> = {
  asc: <ArrowUpwardIcon sx={sortIconStyle} />,
  desc: <ArrowDownwardIcon sx={sortIconStyle} />,
};
