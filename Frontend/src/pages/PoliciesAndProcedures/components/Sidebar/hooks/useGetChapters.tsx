import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChapters } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useFetchChapters = (isSidebarOpen = false) => {
  const dispatch = useAppDispatch();

  const {
    data: chapters,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getChapters(),
    queryKey: CHAPTERS_QUERY_KEY,
    enabled: isSidebarOpen, // only fetch chapters when sidebar is open
    // staleTime: 5 * 60 * 1000, // 5 minutes
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
    chapters,
    isFetching,
  };
};

export default useFetchChapters;
