import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOLS_QUERY_KEY } from "../constants";
import { createMonitoringTool } from "../API";

const useAddMonitoringToolAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addMonitoringTool, isPending: isAdding } = useMutation({
    mutationFn: createMonitoringTool,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOLS_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring tool added successfully",
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
    addMonitoringTool,
    isAdding,
  };
};

export default useAddMonitoringToolAPI;
