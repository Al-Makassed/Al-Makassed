import React, { FC, lazy, Suspense } from "react";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/containers/Layout";
import { Route, Routes } from "react-router-dom";
const Login = lazy(() => import("src/pages/Login"));
const Home = lazy(() => import("src/pages/Home"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const Counter = lazy(() => import("src/pages/Counter"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<BlockUI />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="me" element={<AppLayout />}>
          <Route index path="" element={<Home />} />
          <Route index path="counter" element={<Counter />} />

          <Route path="access-denied" element={<AccessDenied />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
