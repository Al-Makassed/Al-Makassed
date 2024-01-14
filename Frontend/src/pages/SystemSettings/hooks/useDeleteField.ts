import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteField } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { FIELD_QUERY_KEY } from "../constants";

const useDeleteField = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: removeField, isPending } = useMutation({
    mutationFn: deleteField,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FIELD_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Field Deleted Successfully!",
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
    removeField,
    isPending,
  };
};

export default useDeleteField;
