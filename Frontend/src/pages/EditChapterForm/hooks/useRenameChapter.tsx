import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameChapterAPI } from "../API";
import { useAppDispatch } from "src/app/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { CHAPTER_QUERY_KEY } from "../constants";

const useRenameChapter = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: renameChapter, isPending: isRenaming } = useMutation({
    mutationFn: renameChapterAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Chapter Renamed Successfully!",
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
    renameChapter,
    isRenaming,
  };
};

export default useRenameChapter;
