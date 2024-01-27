import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getAnnouncements } from "../API";
import { ANNOUNCEMENTS_QUERY_KEY } from "../constants";

const useGetAnnouncements = () => {
  const dispatch = useAppDispatch();

  const {
    data: announcements,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getAnnouncements(),
    queryKey: [ANNOUNCEMENTS_QUERY_KEY],
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
    announcements,
    isFetching,
  };
};

export default useGetAnnouncements;
