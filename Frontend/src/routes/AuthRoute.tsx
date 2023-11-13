import React, { FC, PropsWithChildren } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthRouteProps } from "./types";
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import BlockUI from "src/containers/BlockUI";

const AuthRoute: FC<PropsWithChildren<AuthRouteProps>> = () => {
  const location = useLocation();

  const { isAuthenticating } = useVerifyAccessToken();

  const user = useAppSelector(selectUser);

  const isUserLoggedIn = !!user.userId;

  if (isAuthenticating) return <BlockUI />;

  if (!isUserLoggedIn)
    return (
      <Navigate
        to="/unauthenticated"
        replace
        state={{ from: location.pathname }}
      />
    );

  return <Outlet />;
};

export default AuthRoute;
