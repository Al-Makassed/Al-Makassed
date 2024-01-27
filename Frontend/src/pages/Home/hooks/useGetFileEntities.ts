import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getFileEntities } from "../API";
import { FILE_ENTITY_QUERY_KEY } from "../constants";

const useGetFileEntities = () => {
  const dispatch = useAppDispatch();

  const {
    data: fileEntities,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFileEntities(),
    queryKey: [FILE_ENTITY_QUERY_KEY],
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
    fileEntities,
    isFetching,
  };
};

export default useGetFileEntities;
