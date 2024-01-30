import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvedPolicyAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { REQUESTS_QUERY_KEY } from "../constants";

const useApprovedPolicy = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: approvePolicy, isPending: isApprovingPolicy } = useMutation({
    mutationFn: approvedPolicyAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Approved Policy Successfully!",
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
    approvePolicy,
    isApprovingPolicy,
  };
};

export default useApprovedPolicy;
