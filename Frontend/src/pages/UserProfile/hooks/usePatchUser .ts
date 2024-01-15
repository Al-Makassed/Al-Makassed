import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { patchUser } from "../API";
import { USER_PROFILE_QUERY_KEY } from "../constants";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { PatchDocument } from "../API/types";

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

  const submitForm = (values: Partial<PatchDocument>) => {
    partialEditUser({
      op: "replace",
      path: `/${values.path}`,
      value: `${values.value}`,
    });
  };

  return {
    partialEditUser,
    submitForm,
    isUpdating: isPending,
  };
};

export default usePatchUser;
