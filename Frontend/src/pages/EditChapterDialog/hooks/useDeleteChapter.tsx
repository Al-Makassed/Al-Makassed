import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChapterAPI } from "../API";
import { useAppDispatch } from "src/store/hooks";
import { showErrorSnackbar, showSuccessSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { CHAPTER_QUERY_KEY } from "../constants";
import { useNavigate } from "react-router-dom";

const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { mutate: deleteChapter } = useMutation({
    mutationFn: deleteChapterAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_QUERY_KEY],
      });
      navigate("/me/chapters");
      dispatch(
        showSuccessSnackbar({
          message: "Deleted chapter Successfully!",
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
    deleteChapter,
  };
};

export default useDeletePolicy;
