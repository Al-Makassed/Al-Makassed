import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePolicyAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { POLICIES_QUERY_KEY } from "../../PolicyDetails/constants";

const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: updatePolicy,
    isPending: isUpdating,
    status,
  } = useMutation({
    mutationFn: updatePolicyAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POLICIES_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Policy Updated Successfully!",
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
    updatePolicy,
    isUpdating,
    status,
  };
};

export default useUpdatePolicy;
