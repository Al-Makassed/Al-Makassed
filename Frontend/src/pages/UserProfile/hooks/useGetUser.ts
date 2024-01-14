import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getUserById } from "../API";
import { USER_PROFILE_QUERY_KEY } from "../constants";

const useGetUser = (userId: string) => {
  const dispatch = useAppDispatch();

  const {
    data: user,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getUserById(userId),
    queryKey: [USER_PROFILE_QUERY_KEY],
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
    user,
    isFetching,
  };
};

export default useGetUser;
