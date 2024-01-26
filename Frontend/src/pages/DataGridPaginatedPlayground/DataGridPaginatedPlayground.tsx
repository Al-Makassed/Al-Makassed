import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useState } from "react";
import { OnRowClick, PageChangeParams } from "src/components/DataGrid/types";
import { UserData } from "./API/types";
import UsersDataGrid from "./definition";
import usePaginatedDataGridPlayground from "./hooks/usePaginatedDataGridPlayground";

interface DataGridPaginatedPlaygroundProps {}

const DataGridPaginatedPlayground: FC<
  DataGridPaginatedPlaygroundProps
> = () => {
  const { pageSize } = UsersDataGrid.configs;

  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize,
  });

  const { rows, totalRows, isFetching } = usePaginatedDataGridPlayground({
    query: pagination,
  });

  const handleOnRowClick: OnRowClick<UserData> = (cell, row) =>
    console.log({ cell, row });

  return (
    <Stack gap={1} sx={{ p: 3, pb: 0 }}>
      <Box sx={{ height: `calc(100vh - 24px)` }}>
        <UsersDataGrid.Provider
          data={rows}
          isFetching={isFetching}
          totalRows={+totalRows}
          // totalPages={Math.floor(totalRows / pagination.pageSize)}
          onFetch={(pagination) => setPagination(pagination)}
          // onFetch={(pagination) => fetchNextPage()}
        >
          <UsersDataGrid.Container>
            <UsersDataGrid.Toolbar>
              <UsersDataGrid.Toolbar.Start>
                <UsersDataGrid.SearchBox />
              </UsersDataGrid.Toolbar.Start>
              <UsersDataGrid.Toolbar.End>
                <UsersDataGrid.Filters />
              </UsersDataGrid.Toolbar.End>
            </UsersDataGrid.Toolbar>
            <UsersDataGrid.Table>
              <UsersDataGrid.Head />
              <UsersDataGrid.Body onRowClick={handleOnRowClick} />
              {/*{isFetching && <UsersDataGrid.Placeholder/>}*/}
            </UsersDataGrid.Table>
            <UsersDataGrid.Footer />
          </UsersDataGrid.Container>
        </UsersDataGrid.Provider>
      </Box>
    </Stack>
  );
};

export default DataGridPaginatedPlayground;
