import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChapter } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/app/hooks";
import { setSnackbarOpen } from "src/features/snackbar";

const useSidebarAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewChapter } = useMutation({
    mutationFn: postChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAPTERS_QUERY_KEY,
      });
      dispatch(
        setSnackbarOpen({
          message: "Chapter added successfully! ",
          severity: "success",
        }),
      );
    },

    onError: () => {
      dispatch(
        setSnackbarOpen({
          message: "Error in entering the chapter name! ",
          severity: "error",
        }),
      );
    },
  });

  return {
    addNewChapter,
  };
};

export default useSidebarAPI;
