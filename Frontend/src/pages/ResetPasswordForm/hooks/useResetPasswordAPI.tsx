import { useMutation } from "@tanstack/react-query";
import { resetForgottenPassword as resetForgottenPasswordApi } from "../API";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { useAppDispatch } from "src/app/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";

const useResetPasswordAPI = () => {
  const dispatch = useAppDispatch();

  const { mutate: resetForgottenPassword, isPending } = useMutation({
    mutationFn: resetForgottenPasswordApi,
    onSuccess: (response) => {
      console.log(response);
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
    resetForgottenPassword,
    isPending,
  };
};

export default useResetPasswordAPI;
