import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameUserRoleAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { USER_QUERY_KEY } from "../constants";

const useEditUserRoleAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: editUserRole, isPending: isRenaming } = useMutation({
    mutationFn: renameUserRoleAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "UserRole Edited Successfully!",
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
    editUserRole,
    isRenaming,
  };
};

export default useEditUserRoleAPI;
