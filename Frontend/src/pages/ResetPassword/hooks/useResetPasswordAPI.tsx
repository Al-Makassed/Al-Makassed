import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "../API";
// import { useAppDispatch } from "src/app/hooks";
// import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
// import { AxiosBaseError } from "src/types";
// import { extractErrorMessage } from "../../Login/utils";
// import { useNavigate } from "react-router-dom";

const useForgetPasswordAPI = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  //   const dispatch = useAppDispatch();

  const { mutate: newResetPassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      queryClient.invalidateQueries({});
      console.log(response);
      //   dispatch(
      //     showSuccessSnackbar({
      //       message: response.message,
      //     }),
      //     // navigate(`reset-password?${email} ${token}`)
      //   );
    },

    // onError: (error: AxiosBaseError) => {
    //   const errorMessage = extractErrorMessage(error);
    //   dispatch(
    //     showErrorSnackbar({
    //       title: "Error",
    //       message: errorMessage,
    //     }),
    //   );
    // },
  });

  return {
    newResetPassword,
    isPending,
  };
};

export default useForgetPasswordAPI;
