import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../API";
import { DEPARTMENT_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useGetDepartments = () => {
  const dispatch = useAppDispatch();

  const {
    data: departments,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getDepartments(),
    queryKey: [DEPARTMENT_QUERY_KEY],
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
    departments: departments ?? [],
    isFetching,
  };
};

export default useGetDepartments;
