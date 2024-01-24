import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDependencyAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { REQUESTS_QUERY_KEY } from "../constants";

const useDeleteDependency = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deleteDependency } = useMutation({
    mutationFn: deleteDependencyAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
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

export default useDeleteDependency;
