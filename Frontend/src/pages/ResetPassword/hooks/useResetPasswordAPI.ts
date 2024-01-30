import { useMutation } from "@tanstack/react-query";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { resetPasswordAPI } from "../API";

const useResetPasswordAPI = () => {
  const dispatch = useAppDispatch();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: (response) => {
      dispatch(
        showSuccessSnackbar({
          message: response.message,
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
    resetPassword,
    isPending,
  };
};

export default useResetPasswordAPI;
