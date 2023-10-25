import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChapter } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/app/hooks";
import { setSnackbarOpen } from "src/features/snackbar";

const useSidebarAPI = () => {
  const queryClient = useQueryClient();
  // const { isOpen, message, severity } = useAppSelector(selectSnackbar);
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
  });

  return {
    addNewChapter,
  };
};

export default useSidebarAPI;
