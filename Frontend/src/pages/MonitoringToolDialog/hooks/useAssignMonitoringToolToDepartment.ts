import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";
import { assignMonitoringToolToDepartment } from "../API";

const useAssignMonitoringToolToDepartment = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: assignDepartments, isPending } = useMutation({
    mutationFn: assignMonitoringToolToDepartment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOL_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring Tool assigned to department successfully!",
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
    assignDepartments,
    isPending,
  };
};

export default useAssignMonitoringToolToDepartment;
