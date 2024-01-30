import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFields } from "../API";
import { FIELD_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { AxiosBaseError } from "src/types/axios";

const useGetFields = () => {
  const dispatch = useAppDispatch();

  const { data: fields, error } = useQuery({
    queryFn: () => getFields(),
    queryKey: FIELD_QUERY_KEY,
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
  };
};

export default useGetFields;
