import { useMutation } from "@tanstack/react-query";
import { approvedPolicyDependenciesAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";

const useApprovedPolicyDependency = () => {
  const dispatch = useAppDispatch();

  const {
    mutate: approvedPolicyDependency,
    isPending: isApprovedPolicyDependency,
  } = useMutation({
    mutationFn: approvedPolicyDependenciesAPI,
    onSuccess: () => {
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
