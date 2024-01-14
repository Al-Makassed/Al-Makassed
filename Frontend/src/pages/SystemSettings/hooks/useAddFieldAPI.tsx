import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createField } from "../API";
import { FIELD_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";

const useAddFieldAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewField, isPending } = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FIELD_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Field added successfully",
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
    addNewField,
    isPending,
  };
};

export default useAddFieldAPI;
