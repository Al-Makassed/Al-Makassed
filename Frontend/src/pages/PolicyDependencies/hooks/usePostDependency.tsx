import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewDependency } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { POLICY_QUERY_KEY } from "src/pages/EditPolicyAndDependenciesDialog/constants";

const usePostDependency = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addDependency, isPending: isAddingDependency } = useMutation({
    mutationFn: addNewDependency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POLICY_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Dependency added successfully",
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
    addDependency,
    isAddingDependency,
  };
};

export default usePostDependency;
