import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/app/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";

const useSidebarAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewChapter } = useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAPTERS_QUERY_KEY,
      });
      dispatch(
        showSuccessSnackbar({
          message: "Chapter added successfully",
        }),
      );
    },

    onError: () => {
      dispatch(
        showErrorSnackbar({
          message: "Error creating a new chapter!",
        }),
      );
    },
  });

  return {
    addNewChapter,
  };
};

export default useSidebarAPI;
