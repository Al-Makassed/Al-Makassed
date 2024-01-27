import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getRecentReadFiles } from "../utils";
import { READ_FILES_QUERY_KEY } from "../constants";

const useGetRecentReadFiles = () => {
  const dispatch = useAppDispatch();

  const {
    data: readFiles,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getRecentReadFiles(),
    queryKey: [READ_FILES_QUERY_KEY],
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
    readFiles,
    isFetching,
  };
};

export default useGetRecentReadFiles;
