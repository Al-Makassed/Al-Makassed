import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { getMonitoringTool } from "../../MonitoringTools/API";
import { MONITORING_TOOL_QUERY_KEY } from "../../MonitoringTools/constants";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";
import { showErrorSnackbar } from "src/features/snackbar";

const useGetMonitoringTool = (monitoringToolId: string) => {
  const dispatch = useAppDispatch();

  const {
    data: monitoringTool,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getMonitoringTool(monitoringToolId),
    queryKey: [MONITORING_TOOL_QUERY_KEY, monitoringToolId],
  });

  useEffect(() => {
    if (!error) return;

    const message = extractErrorMessage(error as AxiosBaseError);
    dispatch(
      showErrorSnackbar({
        message,
      }),
    );
  }, [error]);

  return {
    monitoringTool,
    isFetching,
  };
};

export default useGetMonitoringTool;
