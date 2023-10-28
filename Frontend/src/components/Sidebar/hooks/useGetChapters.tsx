import { useQuery } from "@tanstack/react-query";
import { getChapters } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";

const useFetchChapters = () => {
  const {
    data: chapters,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => getChapters(),
    queryKey: CHAPTERS_QUERY_KEY,
    // staleTime:5000,
  });

  return {
    chapters,
    isFetching,
    isError,
  };
};

export default useFetchChapters;
