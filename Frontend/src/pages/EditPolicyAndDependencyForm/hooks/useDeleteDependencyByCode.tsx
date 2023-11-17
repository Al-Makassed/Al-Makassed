import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDependencyByCode } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { POLICY_QUERY_KEY } from "../constants";

const useDeleteDependencyByCode = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deleteDependency } = useMutation({
    mutationFn: deleteDependencyByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POLICY_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Deleted Dependency Successfully!",
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
    deleteDependency,
  };
};

export default useDeleteDependencyByCode;
