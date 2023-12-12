import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";
import { addFieldToMonitoringTool } from "../API";

const useAddFieldToMonitoringTool = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: appendFieldToMT, isPending } = useMutation({
    mutationFn: addFieldToMonitoringTool,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOL_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Field added to Monitoring Tool successfully!",
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
    appendFieldToMT,
    isPending,
  };
};

export default useAddFieldToMonitoringTool;
