import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/store/hooks";
import { getFocalPointTask } from "../API";
import { FOCAL_POINT_TASK_QUERY_KEY } from "../constants";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types";
import { showErrorSnackbar } from "src/features/snackbar";

const useGetFocalPointTask = (
  departmentId: string,
  focalPointTaskId: string,
) => {
  const dispatch = useAppDispatch();

  const {
    data: focalPointTask,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFocalPointTask(departmentId, focalPointTaskId),
    queryKey: [FOCAL_POINT_TASK_QUERY_KEY],
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
    focalPointTask,
    isFetching,
  };
};

export default useGetFocalPointTask;
