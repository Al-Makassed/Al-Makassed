import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPolicy } from "../API";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";
import { POLICY_QUERY_KEY } from "../constants";
import { GetPolicy } from "../API/types";

const useGetPolicy = ({ chapterId, policyId }: GetPolicy) => {
  const dispatch = useAppDispatch();

  const { data: policy, error } = useQuery({
    queryFn: () => getPolicy({ chapterId, policyId }),
    queryKey: [POLICY_QUERY_KEY, { chapterId, policyId }],
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  };
};

export default useGetPolicy;
