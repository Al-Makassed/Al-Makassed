import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChaptersById } from "../API";
import { CHAPTER_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/app/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useFetchChapter = (id: string) => {
  const dispatch = useAppDispatch();
  const {
    data: chapter,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getChaptersById(id),
    queryKey: [CHAPTER_QUERY_KEY, id],
    enabled: true, // only fetch chapters when sidebar is open
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

export default useFetchChapter;
