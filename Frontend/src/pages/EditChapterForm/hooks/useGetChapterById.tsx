import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChapterById } from "../API";
import { CHAPTER_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useGetChapterById = (id: string) => {
  const dispatch = useAppDispatch();
  const {
    data: chapter,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getChapterById(id),
    queryKey: [CHAPTER_QUERY_KEY, id],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!error) return;

    const message = extractErrorMessage(error as AxiosBaseError);
    dispatch(
      showErrorSnackbar({
        message,
      }),
    );
  }, [error]);

  return {
    chapter,
    isFetching,
  };
};

export default useGetChapterById;
