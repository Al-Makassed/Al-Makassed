import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";
import { getCategories } from "../API";
import { CATEGORIES_QUERY_KEY } from "../constants";

const useGetCategories = () => {
  const dispatch = useAppDispatch();

  const {
    data: categories,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getCategories(),
    queryKey: [CATEGORIES_QUERY_KEY],
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
    categories,
    isFetching,
  };
};

export default useGetCategories;
