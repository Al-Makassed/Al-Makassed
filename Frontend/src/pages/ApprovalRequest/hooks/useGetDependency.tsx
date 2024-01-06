import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dependency_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";
import { getDependency } from "../API";

const useGetDependency = (
  chapterId: string,
  policyId: string,
  dependencyId: string,
) => {
  const dispatch = useAppDispatch();
  const {
    data: dependency,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryFn: () => getDependency(chapterId, policyId, dependencyId),
    queryKey: [Dependency_QUERY_KEY, chapterId, policyId, dependencyId],
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
    dependency,
    isFetching,
    isError,
  };
};

export default useGetDependency;
