import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";
import { updateMonitoringTool } from "../API";

const useUpdateMonitoringToolAPI = (monitoringToolId: string) => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: editMonitoringTool,
    isPending,
    status,
  } = useMutation({
    mutationFn: updateMonitoringTool,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOL_QUERY_KEY, monitoringToolId],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring Tool edited successfully",
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
    editMonitoringTool,
    isPending,
    status,
  };
};

export default useUpdateMonitoringToolAPI;
