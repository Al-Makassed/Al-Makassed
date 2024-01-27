import { createDataGrid } from "src/components/DataGrid";
import { OrderItem } from "./types";
import { formatCurrency } from "src/utils/formatCurrency";
import { ExtendedColumnDef } from "src/components/DataGrid/types";
import StatusCell from "./StatusCell";

export const columns: ExtendedColumnDef<OrderItem>[] = [
  {
    accessorKey: "trackingNo",
    header: "Tracking No.",
  },
  {
    accessorKey: "name",
    header: "Product Name",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "totalOrder",
    header: "Total Order",
    // align: "center",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (ctx) => {
      const totalAmount = Number(ctx.getValue());
      return formatCurrency(totalAmount);
    },
  },
];

const OrdersDataGrid = createDataGrid({
  name: "OrdersDataGrid",
  columns,
  pageSize: 15,
  // pagination: "on", // No need, "on" is the default
  shouldFlexGrowCells: true,
  showTooltip: true,
});

export default OrdersDataGrid;
