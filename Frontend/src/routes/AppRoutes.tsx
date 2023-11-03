import React, { FC, lazy, Suspense } from "react";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/containers/Layout";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
const Login = lazy(() => import("src/pages/Login"));
const Home = lazy(() => import("src/pages/Home"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const Counter = lazy(() => import("src/pages/Counter"));
const PolicyDependency = lazy(() => import("src/pages/PolicyDependency"));
const ForgotPassword = lazy(() => import("src/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("src/pages/ResetPassword"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<BlockUI />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route index path="" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />

            <Route index path="counter" element={<Counter />} />
            <Route index path="dependency" element={<PolicyDependency />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="access-denied" element={<AccessDenied />} />
          </Route>
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
