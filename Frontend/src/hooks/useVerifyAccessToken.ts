import { useQuery } from "@tanstack/react-query";

export const VERIFY_ACCESS_TOKEN_QUERY_KEY = ["VerifyAccessToken"];

const useVerifyAccessToken = () => {
  const x = useQuery({
    queryKey: VERIFY_ACCESS_TOKEN_QUERY_KEY,
    queryFn: () => {},
  });

  return x;
};

export default useVerifyAccessToken;
