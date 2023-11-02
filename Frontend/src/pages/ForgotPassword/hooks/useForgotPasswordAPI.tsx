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

  const { mutate: newPassword } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        // queryKey: CHAPTERS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: response,
        }),
        // navigate(`reset-password?${email} ${token}`) not found email in the response login :(
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
  };
};

export default useForgetPasswordAPI;
