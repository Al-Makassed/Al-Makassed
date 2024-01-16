import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types/axios";
import { extractErrorMessage } from "src/utils";
import { getFields } from "../API";
import { MONITORING_TOOL_QUERY_KEY } from "../constants";

const useGetFields = () => {
  const dispatch = useAppDispatch();

  const {
    data: fields,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFields(),
    queryKey: [MONITORING_TOOL_QUERY_KEY],
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
    fields: fields ?? [],
    isFetching,
  };
};

export default useGetFields;
