import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getFinishedDependencies } from "../API";
import { FINISHED_DEPENDENCIES_QUERY_KEY } from "../constants";

const useGetFinishedDependencies = (filterValue: string) => {
  const dispatch = useAppDispatch();

  const query = filterValue ? `?Filters=policy.chapter.id==${filterValue}` : "";

  const {
    data: dependencies,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFinishedDependencies(query),
    queryKey: [FINISHED_DEPENDENCIES_QUERY_KEY],
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
    dependencies,
    isFetching,
  };
};

export default useGetFinishedDependencies;
