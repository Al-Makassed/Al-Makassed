import { useMutation } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { SignUpApi } from "../API";

const useSignUpAPI = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync: signupUser, isPending: isLoggingIn } = useMutation({
    mutationFn: SignUpApi,
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
          title: "Error",
          message: errorMessage,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }),
      );
    },
  });

  return {
    signupUser,
    isLoggingIn,
  };
};

export default useSignUpAPI;
