import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../API";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { useAppDispatch } from "src/app/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";

const useForgetPasswordAPI = () => {
  const dispatch = useAppDispatch();

  const { mutate: newResetPassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      dispatch(
        showSuccessSnackbar({
          message: "Reset Password Success! ",
        }),
      );
      console.log(response);
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
    newResetPassword,
    isPending,
  };
};

export default useForgetPasswordAPI;
