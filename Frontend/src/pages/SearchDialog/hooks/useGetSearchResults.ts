import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getSearchResults } from "../API";
import { SEARCH_QUERY_KEY } from "../constants";

const useGetSearchResults = (query: string) => {
  const dispatch = useAppDispatch();

  const {
    data: results,
    isFetching,
    error,
  } = useQuery({
    queryKey: [SEARCH_QUERY_KEY, query],
    queryFn: () => (query ? getSearchResults(query) : Promise.resolve([])),
  });

  useEffect(() => {
    if (!error) return;

    const message = extractErrorMessage(error as AxiosBaseError);

    dispatch(
      showErrorSnackbar({
        message,
      }),
    );
  }, [error]);

  return {
    results,
    isSearching: isFetching,
  };
};

export default useGetSearchResults;
