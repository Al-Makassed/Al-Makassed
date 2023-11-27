import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import verifyAccessToken from "src/API/verifyAccessToken";
import { useAppDispatch } from "src/store/hooks";
import { login } from "src/features/user";

export const VERIFY_ACCESS_TOKEN_QUERY_KEY = ["VerifyAccessToken"];

const useVerifyAccessToken = () => {
  const dispatch = useAppDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const { data, isFetching } = useQuery({
    queryKey: VERIFY_ACCESS_TOKEN_QUERY_KEY,
    queryFn: verifyAccessToken,
    retry: false, // do not retry on error
  });

  useEffect(() => {
    if (isFetching) return;

    // If the data is undefined, and the API is no longer fetching, then the access token is invalid
    // Hence, terminate the authentication process.
    if (!data) {
      setIsAuthenticating(false);
      return;
    }

    const { id, roles, userName, fullName, email, phoneNumber, avatarUrl } =
      data;

    dispatch(
      login({
        userId: id,
        roles: Array.isArray(roles) ? roles : [roles],
        userName,
        email,
        fullName,
        phoneNumber,
        avatarUrl,
      }),
    );

    setIsAuthenticating(false); // terminate the authentication process after dispatching is finished
  }, [data, isFetching]);

  return {
    data,
    isAuthenticating,
  };
};

export default useVerifyAccessToken;
