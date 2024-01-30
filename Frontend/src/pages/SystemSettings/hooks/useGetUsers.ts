import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../API";
import { USER_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useGetUsers = () => {
  const dispatch = useAppDispatch();

  const { data: users, error } = useQuery({
    queryFn: () => getUsers(),
    queryKey: [USER_QUERY_KEY],
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
    users: users ?? [],
  };
};

export default useGetUsers;
