import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApprovalRequests } from "../API";
import { REQUESTS_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useApprovedRequests = () => {
  const dispatch = useAppDispatch();

  const {
    data: requests,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getApprovalRequests(),
    queryKey: REQUESTS_QUERY_KEY,
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
    requests: requests ?? [],
    isFetching,
  };
};

export default useApprovedRequests;
