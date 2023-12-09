import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllPolicyDependenciesAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { POLICY_QUERY_KEY } from "../constants";

const useDeleteAllPolicyDependencies = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deleteAllDependencies } = useMutation({
    mutationFn: deleteAllPolicyDependenciesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POLICY_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Deleted All Policy Dependencies Successfully!",
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
    deleteAllDependencies,
  };
};

export default useDeleteAllPolicyDependencies;
