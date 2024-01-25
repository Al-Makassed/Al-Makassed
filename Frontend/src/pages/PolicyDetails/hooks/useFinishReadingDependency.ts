import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { finishReadingDependency } from "../API";
import { FINISH_READING_DEPENDENCY_QUERY_KEY } from "../constants";

const useFinishReadingDependency = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: finishDependency } = useMutation({
    mutationFn: finishReadingDependency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FINISH_READING_DEPENDENCY_QUERY_KEY],
      });
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
    finishDependency,
  };
};

export default useFinishReadingDependency;
