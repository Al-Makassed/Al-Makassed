import React, { FC, lazy, Suspense } from "react";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/containers/Layout";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
const Login = lazy(() => import("src/pages/Login"));
const Home = lazy(() => import("src/pages/Home"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const Counter = lazy(() => import("src/pages/Counter"));
const PolicyDependency = lazy(() => import("src/pages/PolicyDependency"));
const Unauthenticated = lazy(() => import("src/pages/Unauthenticated"));
const LandingPage = lazy(() => import("src/pages/LandingPage"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<BlockUI />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route index path="" element={<LandingPage />} />
        <Route path="me" element={<AppLayout />}>
          <Route element={<AuthRoute />}>
            <Route index path="" element={<Home />} />
            <Route index path="home" element={<Home />} />
            <Route index path="counter" element={<Counter />} />
            <Route index path="dependency" element={<PolicyDependency />} />
          </Route>
        </Route>

        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="unauthenticated" element={<Unauthenticated />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
