import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { finishReadingPolicy } from "../API";
import { FINISH_READING_POLICY_QUERY_KEY } from "../constants";

const useFinishReadingPolicy = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: finishPolicy } = useMutation({
    mutationFn: finishReadingPolicy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FINISH_READING_POLICY_QUERY_KEY],
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
    finishPolicy,
  };
};

export default useFinishReadingPolicy;
