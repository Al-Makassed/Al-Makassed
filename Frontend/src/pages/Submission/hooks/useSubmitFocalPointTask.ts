import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { submitFocalPointTask } from "../API";
import { FOCAL_POINT_TASK_QUERY_KEY } from "../constants";

const useSubmitFocalPointTask = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: addSubmission,
    isPending,
    status,
  } = useMutation({
    mutationFn: submitFocalPointTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FOCAL_POINT_TASK_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Submitted successfully",
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
    addSubmission,
    isPending,
    status,
  };
};

export default useSubmitFocalPointTask;
