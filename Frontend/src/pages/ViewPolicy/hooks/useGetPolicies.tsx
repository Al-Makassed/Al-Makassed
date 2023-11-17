import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPolicyInformation } from "../API";
import { POLICIES_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { Policy } from "../API/types";
import { AxiosBaseError } from "src/types";

const useFetchPolicies = () => {
  const dispatch = useAppDispatch();
  const {
    data: policies,
    isFetching,
    isError,
    error,
  } = useQuery<Policy[], AxiosBaseError, Policy[], string[]>({
    queryFn: () => getPolicyInformation(),
    queryKey: POLICIES_QUERY_KEY,
  });

  useEffect(() => {
    if (error) {
      const message = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          message,
        }),
      );
    }
  }, [error]);

  return {
    policies,
    isFetching,
    isError,
  };
};

export default useFetchPolicies;
