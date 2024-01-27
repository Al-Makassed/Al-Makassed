import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useContext } from "react";
import theme from "src/style/maqasidTheme";
import { CreateDataGridConfigWithDefaults, DataGridTableProps } from "./types";

export function makeDataGridTable<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>,
) {
  const DataGridTable = (props: DataGridTableProps) => {
    const { children, TableContainerProps, TableProps } = props;

    const { table } = useContext(configs.Context);

    const { getTotalSize } = table;

    return (
      <TableContainer
        component={Paper}
        sx={{
          height: "100%",
          // overflow: "auto",
          position: "relative",
          borderRadius: "4px 4px 0 0",
          ...theme.mixins.niceScroll(),
        }}
        {...TableContainerProps}
      >
        <Table
          sx={{
            // borderRadius: 0,
            position: "relative",
            height: "100%",
            minWidth: "100%",
            width: getTotalSize(),
          }}
          {...TableProps}
        >
          {children}
        </Table>
      </TableContainer>
    );
  };

  DataGridTable.displayName = `${configs.name}.Table`;

  return DataGridTable;
}
