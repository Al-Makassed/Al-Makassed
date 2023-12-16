import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../API";
import { useNavigate } from "react-router-dom";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "../utils";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar } from "src/features/snackbar";
import { login } from "src/features/user";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";

const useLoginAPI = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutateAsync: loginUser, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.token);
      const {
        userId,
        userName,
        fullName,
        email,
        departmentId,
        roles,
        phoneNumber,
        avatarUrl,
      } = response;

      dispatch(
        login({
          userId,
          userName,
          fullName,
          email,
          departmentId,
          phoneNumber,
          roles,
          avatarUrl: avatarUrl ?? "",
        }),
      );
      navigate("/me");
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
