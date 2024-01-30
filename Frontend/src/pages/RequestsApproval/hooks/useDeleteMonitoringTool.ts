import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonitoringTool } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { REQUESTS_QUERY_KEY } from "../constants";

const useDeleteMonitoringTool = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: removeMonitoringTool, isPending } = useMutation({
    mutationFn: deleteMonitoringTool,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring Tool Deleted Successfully!",
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
    removeMonitoringTool,
    isPending,
  };
};

export default useDeleteMonitoringTool;
