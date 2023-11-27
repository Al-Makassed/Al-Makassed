import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";
import { getFocalPointTasks } from "../API";
import { FOCAL_POINT_TASKS_QUERY_KEY } from "../constants";

const useGetFocalPointTasks = (departmentId: string) => {
  const dispatch = useAppDispatch();

  const {
    data: focalPointTasks,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFocalPointTasks(departmentId),
    queryKey: [FOCAL_POINT_TASKS_QUERY_KEY, departmentId],
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
    focalPointTasks,
    isFetching,
  };
};

export default useGetFocalPointTasks;
