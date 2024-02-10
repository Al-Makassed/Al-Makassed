import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPolicy } from "../API";
import { POLICY_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";

const useGetPolicy = (chapterId: string, policyId: string) => {
  const dispatch = useAppDispatch();
  const {
    data: policy,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryFn: () => getPolicy(chapterId, policyId),
    queryKey: [POLICY_QUERY_KEY, chapterId, policyId],
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
    policy,
    isFetching,
    isError,
  };
};

export default useGetPolicy;
