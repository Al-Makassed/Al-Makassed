import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { generateRandomDate } from "src/components/DataGrid/utils";
import { fetchUsersPaginated } from "../API";
import { UsePaginatedDataGridPlaygroundAPIProps } from "../types";

const usePaginatedDataGridPlaygroundAPI = ({
  query,
}: UsePaginatedDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);

  const { pageIndex, pageSize } = query;

  const { data, isFetching, isError, error, isSuccess } = useQuery({
    queryKey: ["users", pageIndex, pageSize],
    queryFn: () =>
      fetchUsersPaginated({ pageIndex: pageIndex ?? 0, pageSize }).then(
        (res) => {
          setTotalRows(res?.headers["x-total-count"] ?? 0);
          // return res?.data ?? [];
          const dataWithDates = res?.data?.map((user) => ({
            ...user,
            birthDate: generateRandomDate("2000-01-01", "2023-12-31"),
          }));
          return dataWithDates ?? [];
        },
      ),
  });

  return {
    rows: data ?? [],
    isFetching,
    isError,
    error,
    isSuccess,
    totalRows,
  };
};

export default usePaginatedDataGridPlaygroundAPI;
