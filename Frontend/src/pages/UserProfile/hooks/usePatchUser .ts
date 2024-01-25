import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { patchUser } from "../API";
import { USER_PROFILE_QUERY_KEY } from "../constants";

const usePatchUser = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: partialEditUser, isPending } = useMutation({
    mutationFn: patchUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_PROFILE_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "User info edited successfully",
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
    partialEditUser,
    isUpdating: isPending,
  };
};

export default usePatchUser;
