import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameFieldAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { FIELD_QUERY_KEY } from "../constants";

const useEditFieldAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: editField, isPending: isRenaming } = useMutation({
    mutationFn: renameFieldAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FIELD_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Field Edited Successfully!",
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
    editField,
    isRenaming,
  };
};

export default useEditFieldAPI;
