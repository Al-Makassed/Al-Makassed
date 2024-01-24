import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getFinishedDependencies } from "../API";

const useGetFinishedDependencies = (filterValue: string) => {
  const dispatch = useAppDispatch();

  const query = filterValue ? `?Filters=policy.chapter.id==${filterValue}` : "";

  const {
    data: dependencies,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFinishedDependencies(query),
    queryKey: ["whenever"],
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
