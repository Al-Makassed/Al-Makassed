import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import {
  DEPENDENCY_READING_QUERY_KEY,
  POLICY_READING_QUERY_KEY,
} from "../constants";
import {
  userDependencyReadingsPercentage,
  userPolicyReadingsPercentage,
} from "../API";

export enum ReadingEntityType {
  POLICY,
  DEPENDENCY,
}

const useGetReadingsPercentage = (type: ReadingEntityType) => {
  const dispatch = useAppDispatch();

  const {
    data: readingsPercentage,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => {
      console.log("type:", type); // Add this line
      return type === ReadingEntityType.POLICY
        ? userPolicyReadingsPercentage()
        : userDependencyReadingsPercentage();
    },
    queryKey: [
      type === ReadingEntityType.POLICY
        ? POLICY_READING_QUERY_KEY
        : DEPENDENCY_READING_QUERY_KEY,
    ],
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
    readingsPercentage,
    isFetching,
  };
};

export default useGetReadingsPercentage;
