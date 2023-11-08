import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllPoliciesAPI } from "../API";
import { useAppDispatch } from "src/app/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { CHAPTER_QUERY_KEY } from "../constants";

const useDeleteAllPolicies = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deleteAllPolicies } = useMutation({
    mutationFn: deleteAllPoliciesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Deleted All Policy Successfully!",
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
    deleteAllPolicies,
  };
};

export default useDeleteAllPolicies;
