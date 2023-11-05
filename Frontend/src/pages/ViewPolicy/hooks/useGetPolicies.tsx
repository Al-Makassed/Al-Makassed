import { useQuery } from "@tanstack/react-query";
import { getPolicyInformation } from "../API";
import { POLICIES_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/app/hooks";

const useFetchPolicies = () => {
  const dispatch = useAppDispatch();
  const {
    data: policies,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => getPolicyInformation(),
    queryKey: POLICIES_QUERY_KEY,
  });

  if (isError) {
    dispatch(
      showErrorSnackbar({
        message: "Error fetching chapters!",
      }),
    );
  }

  return {
    policies,
    isFetching,
    isError,
  };
};

export default useFetchPolicies;
