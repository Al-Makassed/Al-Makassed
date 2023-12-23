import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { DEPARTMENT_QUERY_KEY } from "../constants";

const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: removeDepartment, isPending } = useMutation({
    mutationFn: deleteDepartment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Department Deleted Successfully!",
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
    removeDepartment,
    isPending,
  };
};

export default useDeleteDepartment;
