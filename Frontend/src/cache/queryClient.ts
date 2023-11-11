import { QueryClient, QueryCache } from "@tanstack/react-query";
import { AxiosBaseError } from "src/types/axios";
import { extractErrorMessage } from "src/utils";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const errorMessage = extractErrorMessage(error as AxiosBaseError);
      console.error(`Something went wrong: ${errorMessage}`);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 60 * 60 * 1000, // 1 hour
    },
  },
});

export default queryClient;
