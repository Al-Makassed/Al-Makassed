import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonitoringToolField } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";

const useDeleteMonitoringToolField = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: removeMonitoringToolField, isPending } = useMutation({
    mutationFn: deleteMonitoringToolField,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MONITORING_TOOL_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Monitoring Tool Field is Deleted Successfully!",
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
    removeMonitoringToolField,
    isPending,
  };
};

export default useDeleteMonitoringToolField;
