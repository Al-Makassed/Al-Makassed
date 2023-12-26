import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";
import { showErrorSnackbar } from "src/features/snackbar";
import { getSubmission } from "../API";
import { SUBMISSIONS_LOG_QUERY_KEY } from "../constants";

const useGetSubmission = (submissionId: string) => {
  const dispatch = useAppDispatch();

  const {
    data: submission,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getSubmission(submissionId),
    queryKey: [SUBMISSIONS_LOG_QUERY_KEY, submissionId],
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
    submission,
    isFetching,
  };
};

export default useGetSubmission;
