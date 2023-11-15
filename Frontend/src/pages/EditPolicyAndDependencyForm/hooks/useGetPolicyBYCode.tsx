import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPolicyByCode } from "../API";
import { POLICY_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useGetPolicyByCode = (code: string) => {

  const dispatch = useAppDispatch();

  const {
    data: policy,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getPolicyByCode(code),
    queryKey: [POLICY_QUERY_KEY, code],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!error) return;

    const message = extractErrorMessage(error as AxiosBaseError);
    dispatch(
      showErrorSnackbar({
        message,
      })
    );
  }, [error]);

  return {
    policy,
    isFetching,
  };
};

export default useGetPolicyByCode;
