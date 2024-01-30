import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvedPolicyDependenciesAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
// import queryClient from "src/cache/queryClient";
import { REQUESTS_QUERY_KEY } from "../constants";

const useApprovedPolicyDependency = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: approvedPolicyDependency,
    isPending: isApprovedPolicyDependency,
  } = useMutation({
    mutationFn: approvedPolicyDependenciesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Approved Policy Dependency Successfully!",
        }),
      );
    },
    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          message: errorMessage,
        }),
      );
    },
  });

  return {
    approvedPolicyDependency,
    isApprovedPolicyDependency,
  };
};

export default useApprovedPolicyDependency;
