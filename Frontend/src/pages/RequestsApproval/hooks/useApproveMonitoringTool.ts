import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvedMonitoringToolAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { REQUESTS_QUERY_KEY } from "../constants";

const useApprovedMonitoringTool = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const {
    mutate: approvedMonitoringTool,
    isPending: isApprovedMonitoringTool,
  } = useMutation({
    mutationFn: approvedMonitoringToolAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: REQUESTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Approved MonitoringTools Successfully!",
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
    approvedMonitoringTool,
    isApprovedMonitoringTool,
  };
};

export default useApprovedMonitoringTool;
