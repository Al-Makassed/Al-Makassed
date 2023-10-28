import { useQuery } from "@tanstack/react-query";
import { getChapters } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/app/hooks";

const useFetchChapters = () => {
  const dispatch = useAppDispatch();

  const {
    data: chapters,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => getChapters(),
    queryKey: CHAPTERS_QUERY_KEY,
    // staleTime:5000,
  });

  if (isError) {
    dispatch(
      showErrorSnackbar({
        message: "Error creating a new chapter!",
      }),
    );
  }
  return {
    chapters,
    isFetching,
  };
};

export default useFetchChapters;
