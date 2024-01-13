import { useMutation } from "@tanstack/react-query";
import { SignUpApi } from "../API";
// import { useNavigate } from "react-router-dom";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";

const useSignupAPI = () => {
  const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

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

export default useSignupAPI;
