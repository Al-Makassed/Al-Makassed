import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makePlaceholder } from "src/components/DataGrid/Placeholder";
import { StyledTableRow } from "src/components/DataGrid/styled";
import {
  CreateDataGridConfigWithDefaults,
  DataGridBodyProps,
} from "src/components/DataGrid/types";
import theme from "src/style/maqasidTheme";
import EmptyBody from "./EmptyBody";
import Tooltip from "@mui/material/Tooltip";
import { Fragment } from "react";

export function makeDataGridInfiniteBody<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>,
) {
  const DataGridInfiniteBody = (props: DataGridBodyProps<T>) => {
    const BodyPlaceholder = makePlaceholder(configs);

    const { onRowClick, isRowClickable } = props;

    const {
      table,
      handleFetchMore,
      totalRows = 99999,
      striped,
    } = useContext(configs.Context);

    const { getRowModel } = table;

    const { shouldFlexGrowCells, showTooltip } = configs;

    const isRowClickableBoolean = isRowClickable ?? Boolean(props.onRowClick);

    const CellWrapper = showTooltip ? Tooltip : Fragment;

    const renderRows = () =>
      getRowModel().rows.map((row) => (
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
                    width: shouldFlexGrowCells
                      ? "150px"
                      : cell.column.getSize(),
                    // width: cell.column.getSize(),
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

    if (getRowModel().rows.length === 0) return <EmptyBody />;

    return (
      <TableBody
        id="scrollableTableBody"
        sx={{
          display: "block",
          height: "100%",
          ...theme.mixins.niceScroll(),
        }}
        {...props}
      >
        <InfiniteScroll
          scrollableTarget="scrollableTableBody"
          dataLength={getRowModel().rows.length}
          next={handleFetchMore}
          hasMore={getRowModel().rows.length < totalRows}
          loader={<BodyPlaceholder />}
          endMessage={<p>Yay! You have seen it all</p>}
          style={{ overflow: "hidden" }}
        >
          {renderRows()}
        </InfiniteScroll>
      </TableBody>
    );
  };

  DataGridInfiniteBody.displayName = `${configs.name}.InfiniteBody`;

  return DataGridInfiniteBody;
}
