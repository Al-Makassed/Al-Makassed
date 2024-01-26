import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { generateRandomDate } from "src/components/DataGrid/utils";
import { fetchUsersInfinite } from "../API";
import { UseInfiniteDataGridPlaygroundAPIProps } from "../types";

const useInfiniteDataGridPlaygroundAPI = ({
  query,
}: UseInfiniteDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);

  const { data, error, isFetching, fetchNextPage, isError, isSuccess } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam = 0 }) => {
        return fetchUsersInfinite({
          pageIndex: pageParam,
          pageSize: query?.pageSize ?? 20,
        }).then((res) => {
          setTotalRows(res?.headers["x-total-count"] ?? 0);
          // return res?.data ?? [];
          const dataWithDates = res?.data?.map((user) => ({
            ...user,
            birthDate: generateRandomDate("2000-01-01", "2023-12-31"),
          }));
          return dataWithDates ?? [];
        });
      },
      getNextPageParam: (lastPage, allPages) => allPages?.length ?? 0, // because first page is 0, not 1
      initialPageParam: 0,
    });

  const allRows = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data],
  );

  return {
    allRows,
    isFetching,
    isError,
    error,
    isSuccess,
    totalRows,
    fetchNextPage,
  };
};

export default useInfiniteDataGridPlaygroundAPI;
