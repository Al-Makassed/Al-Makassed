import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "../API";
import { useAppDispatch } from "src/app/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "../../Login/utils";
// import { useNavigate } from "react-router-dom";

const useForgetPasswordAPI = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: newPassword, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      queryClient.invalidateQueries({});
      dispatch(
        showSuccessSnackbar({
          message: response.message,
        }),
        // navigate(`reset-password?${email} ${token}`)
      );
    },

    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          title: "Error",
          message: errorMessage,
        }),
      );
    },
  });

  return {
    newPassword,
    isPending,
  };
};

export default useForgetPasswordAPI;
