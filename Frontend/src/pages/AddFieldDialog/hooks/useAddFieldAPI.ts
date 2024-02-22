import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { FIELDS_QUERY_KEY } from "../constants";
import { createField } from "../API";

const useAddFieldAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: addNewField,
    isPending,
    status,
  } = useMutation({
    mutationFn: createField,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FIELDS_QUERY_KEY,
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
    status,
  };
};

export default useAddFieldAPI;
