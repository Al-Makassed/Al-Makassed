import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameDepartmentAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { DEPARTMENT_QUERY_KEY } from "../constants";

const useEditDepartmentAPI = (departmentId: string) => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: editDepartment, isPending: isRenaming } = useMutation({
    mutationFn: renameDepartmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...DEPARTMENT_QUERY_KEY, departmentId],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Department Edited Successfully!",
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
    editDepartment,
    isRenaming,
  };
};

export default useEditDepartmentAPI;
