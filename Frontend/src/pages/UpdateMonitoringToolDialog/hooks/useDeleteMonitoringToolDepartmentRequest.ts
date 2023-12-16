import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonitoringToolDepartment } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";

const useDeleteMonitoringToolDepartment = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: unassignDepartment, isPending } = useMutation({
    mutationFn: deleteMonitoringToolDepartment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOL_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring Tool is Unassigned to Department Successfully",
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
    unassignDepartment,
    isPending,
  };
};

export default useDeleteMonitoringToolDepartment;
