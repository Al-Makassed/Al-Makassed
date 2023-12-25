import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";
import { showErrorSnackbar } from "src/features/snackbar";
import { getTaskSubmissions } from "../API";
import { SUBMISSIONS_LOG_QUERY_KEY } from "../constants";

const useGetTaskSubmissions = (
  departmentId: string,
  focalPointTaskId: string,
) => {
  const dispatch = useAppDispatch();

  const {
    data: submissions,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getTaskSubmissions({ departmentId, focalPointTaskId }),
    queryKey: [SUBMISSIONS_LOG_QUERY_KEY, departmentId, focalPointTaskId],
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
    submissions,
    isFetching,
  };
};

export default useGetTaskSubmissions;
