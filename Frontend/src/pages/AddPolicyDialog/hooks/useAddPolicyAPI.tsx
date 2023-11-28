import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPolicy } from "../API";
// import { POLICIES_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { CHAPTERS_QUERY_KEY } from "src/containers/Sidebar/constants";

const useAddPolicyAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewPolicy, isPending } = useMutation({
    mutationFn: createPolicy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAPTERS_QUERY_KEY,
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
    isPending,
  };
};

export default useAddPolicyAPI;
