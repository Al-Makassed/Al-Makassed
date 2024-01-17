import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { USER_QUERY_KEY } from "../constants";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: removeUser, isPending } = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "User Deleted Successfully!",
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
    removeUser,
    isPending,
  };
};

export default useDeleteUser;
