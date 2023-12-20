import { useMutation } from "@tanstack/react-query";
import { approvedPolicyAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";

const useApprovedPolicy = () => {
  const dispatch = useAppDispatch();

  const { mutate: approvedPolicy, isPending: isApprovedPolicy } = useMutation({
    mutationFn: approvedPolicyAPI,
    onSuccess: () => {
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
    approvedPolicy,
    isApprovedPolicy,
  };
};

export default useApprovedPolicy;
