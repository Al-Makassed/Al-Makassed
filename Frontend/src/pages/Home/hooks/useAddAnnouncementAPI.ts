import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { addAnnouncement } from "../API";
import { ANNOUNCEMENTS_QUERY_KEY } from "../constants";

const useAddAnnouncementAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: postAnnouncement, isPending: isAdding } = useMutation({
    mutationFn: addAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ANNOUNCEMENTS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Announcement Posted successfully",
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
    postAnnouncement,
    isAdding,
  };
};

export default useAddAnnouncementAPI;
