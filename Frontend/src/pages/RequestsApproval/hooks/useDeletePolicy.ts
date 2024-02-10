import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePolicyAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { REQUESTS_QUERY_KEY } from "../constants";

const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deletePolicy } = useMutation({
    mutationFn: deletePolicyAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Deleted Policy Successfully!",
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
    deletePolicy,
  };
};

export default useDeletePolicy;
