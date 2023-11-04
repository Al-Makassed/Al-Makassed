import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../API";
import { useNavigate } from "react-router-dom";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "../utils";
import { useAppDispatch } from "src/app/hooks";
import { showErrorSnackbar } from "src/features/snackbar";
import { login } from "src/features/user";

const useLoginAPI = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.token);
      console.log(response.token);
      dispatch(
        login({
          token: response.token,
          userId: response.userId,
          userName: response.userName,
          email: response.email,
          role: response.role,
          profileUrl: response.profileUrl,
        }),
      );
      navigate("/home");
      window.location.reload();
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
    loginUser,
    isLoggingIn,
  };
};

export default useLoginAPI;
