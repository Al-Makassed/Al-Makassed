import Typography from "@mui/material/Typography";
import { FC, useContext } from "react";
import { makeDataGridFooterSkeleton } from "./DataGridFooterSkeleton";
import { CreateDataGridConfig, DataGridInfiniteFooterProps } from "./types";

export function makeDataGridInfiniteFooter<T extends object>(
  configs: CreateDataGridConfig<T>,
) {
  const Footer = makeDataGridFooterSkeleton<T>(configs);

  const DataGridInfiniteFooter: FC<DataGridInfiniteFooterProps> = () => {
    const { table, totalRows } = useContext(configs.Context);

    const { getState } = table;

    const pageIndex = getState().pagination.pageIndex;
    const pageSize = getState().pagination.pageSize;
    const fetchedItemsCount = (pageIndex + 1) * pageSize;

    return (
      <Footer>
        <Footer.Start />
        <Footer.End>
          <Typography>
            1 - {fetchedItemsCount} of {totalRows ?? "?"}
          </Typography>
        </Footer.End>
      </Footer>
    );
  };

  DataGridInfiniteFooter.displayName = `${configs.name}.InfiniteFooter`;

  return DataGridInfiniteFooter;
}
