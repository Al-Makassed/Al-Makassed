import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameUserDepartmentAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { USER_QUERY_KEY } from "../constants";

const useEditUserDepartmentAPI = (userId: string) => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: editUserDepartment, isPending: isRenaming } = useMutation({
    mutationFn: renameUserDepartmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...USER_QUERY_KEY, userId],
      });
      dispatch(
        showSuccessSnackbar({
          message: "UserDepartment Edited Successfully!",
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
    editUserDepartment,
    isRenaming,
  };
};

export default useEditUserDepartmentAPI;
