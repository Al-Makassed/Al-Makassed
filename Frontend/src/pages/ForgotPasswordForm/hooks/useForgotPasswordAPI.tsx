import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "../../Login/utils";

const useForgetPasswordAPI = () => {
  const dispatch = useAppDispatch();

  const { mutate: requestNewPassword, isPending } = useMutation({
    mutationFn: forgotPassword,
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
    requestNewPassword,
    isPending,
  };
};

export default useForgetPasswordAPI;
