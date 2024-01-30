import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getDependency } from "../API";
import { GetDependency } from "../API/types";
import { Dependency_QUERY_KEY } from "../constants";

const useGetDependency = ({ chapterId, policyId, id }: GetDependency) => {
  const dispatch = useAppDispatch();
  const {
    data: dependency,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryFn: () => getDependency({ chapterId, policyId, id }),
    queryKey: [Dependency_QUERY_KEY, chapterId, policyId, id],
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
