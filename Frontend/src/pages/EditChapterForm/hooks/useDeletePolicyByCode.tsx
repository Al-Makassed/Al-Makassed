import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePolicyByCode } from "../API";
import { useAppDispatch } from "src/app/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { CHAPTER_QUERY_KEY } from "../constants";

const useDeletePolicyByCode = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: deletePolicy } = useMutation({
    mutationFn: deletePolicyByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_QUERY_KEY],
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

export default useDeletePolicyByCode;
