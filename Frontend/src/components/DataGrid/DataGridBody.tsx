import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { StyledTableRow } from "src/components/DataGrid/styled";
import theme from "src/style/maqasidTheme";
import EmptyBody from "./EmptyBody";
import { makePlaceholder } from "./Placeholder";
import { CreateDataGridConfigWithDefaults, DataGridBodyProps } from "./types";
import { Tooltip } from "@mui/material";
import { Fragment } from "react";

export function makeDataGridBody<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>,
) {
  const BodyPlaceholder = makePlaceholder(configs);

  const DataGridBody = (props: DataGridBodyProps<T>) => {
    const { onRowClick, isRowClickable } = props;

    const { table, striped, isFetching } = useContext(configs.Context);

    const { getRowModel } = table;

    const { shouldFlexGrowCells, showTooltip } = configs;

    const isRowClickableBoolean = isRowClickable ?? Boolean(props.onRowClick);

    const rowModel = getRowModel();

    const CellWrapper = showTooltip ? Tooltip : Fragment;

    const renderRows = () =>
      rowModel.rows.map((row) => (
        <StyledTableRow
          key={row.id}
          striped={striped}
          isClickable={isRowClickableBoolean}
          sx={{
            width: "100%",
            tableLayout: "fixed",
            display: "flex",
          }}
        >
          {row.getVisibleCells().map((cell, idx) => {
            const cellContent = flexRender(
              cell.column.columnDef.cell,
              cell.getContext(),
            );
            const columnConfigs = configs.columns[idx];

            return (
              <CellWrapper
                key={cell.id}
                title={cellContent}
                enterDelay={1500}
                arrow
              >
                <TableCell
                  key={cell.id}
                  align={columnConfigs.align}
                  onClick={() => onRowClick?.(cell, row)}
                  sx={{
                    // width: shouldFlexGrowCells ? "150px" : cell.column.getSize(),
                    width: cell.column.getSize(),
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    flexGrow: shouldFlexGrowCells ? 1 : 0,
                  }}
                >
                  {cellContent}
                </TableCell>
              </CellWrapper>
            );
          })}
        </StyledTableRow>
      ));

    if (isFetching) return <BodyPlaceholder />;

    if (rowModel.rows.length === 0) return <EmptyBody />;

    return (
      <TableBody
        sx={{
          display: "block",
          // overflow: "auto",
          // height: `calc(100% - 33px)`,
          height: "100%",
          // overflowY: "scroll",
          ...theme.mixins.niceScroll(),
        }}
        {...props}
      >
        {renderRows()}
      </TableBody>
    );
  };

  DataGridBody.displayName = `${configs.name}.Body`;

  return DataGridBody;
}
