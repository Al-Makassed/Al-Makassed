import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPolicy } from "../API";
import { POLICIES_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/app/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";

const useAddPolicyAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewPolicy } = useMutation({
    mutationFn: createPolicy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POLICIES_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Policy added successfully",
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
    addNewPolicy,
  };
};

export default useAddPolicyAPI;
