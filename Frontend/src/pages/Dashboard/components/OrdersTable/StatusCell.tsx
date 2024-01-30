import { Stack, Typography } from "@mui/material";
import StatusDot, { StatusDotProps } from "src/components/StatusDot/";
import { CellContext } from "@tanstack/react-table";
import { OrderItem } from "./types";

const StatusCell = ({ row }: CellContext<OrderItem, string>) => {
  const status = row.original.status;

  const colorMap: Record<OrderItem["status"], StatusDotProps["color"]> = {
    Pending: "warning",
    Approved: "success",
    Rejected: "error",
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <StatusDot color={colorMap[status]} />
      <Typography>{status}</Typography>
    </Stack>
  );
};

export default StatusCell;
