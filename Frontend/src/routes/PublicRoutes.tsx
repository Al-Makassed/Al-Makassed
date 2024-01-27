import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// pages
const LoginPage = lazy(() => import("src/pages/Login"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const Unauthenticated = lazy(() => import("src/pages/Unauthenticated"));
const LandingPage = lazy(() => import("src/pages/LandingPage"));
const ForgotPasswordForm = lazy(() => import("src/pages/ForgotPasswordForm"));
const ResetForgottenPasswordForm = lazy(
  () => import("src/pages/ResetForgottenPasswordForm"),
);

const publicRoutes: RouteObject = {
  path: "",
  children: [
    {
      path: "",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordForm />,
    },
    {
      path: "reset-password",
      element: <ResetForgottenPasswordForm />,
    },
    {
      path: "access-denied",
      element: <AccessDenied />,
    },
    {
      path: "unauthenticated",
      element: <Unauthenticated />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default publicRoutes;
