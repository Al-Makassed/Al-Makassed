import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";
import { getMonitoringTools } from "../API";
import { MONITORING_TOOLS_QUERY_KEY } from "../constants";

const useGetMonitoringTools = () => {
  const dispatch = useAppDispatch();

  const {
    data: monitoringTools,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getMonitoringTools(),
    queryKey: MONITORING_TOOLS_QUERY_KEY,
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
    monitoringTools,
    isFetching,
  };
};

export default useGetMonitoringTools;
