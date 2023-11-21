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
const PolicyDetails = lazy(() => import("src/pages/PolicyDetails"));
const Unauthenticated = lazy(() => import("src/pages/Unauthenticated"));
const LandingPage = lazy(() => import("src/pages/LandingPage"));
const ForgotPasswordForm = lazy(() => import("src/pages/ForgotPasswordForm"));
const ResetForgottenPasswordForm = lazy(
  () => import("src/pages/ResetForgottenPasswordForm"),
);
const EditChapterForm = lazy(() => import("src/pages/EditChapterForm"));
const EditPolicyAndDependenciesForm = lazy(
  () => import("src/pages/EditPolicyAndDependenciesForm"),
);

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<BlockUI />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<LandingPage />} />

        <Route path="me" element={<AppLayout />}>
          <Route element={<AuthRoute />}>
            <Route index path="" element={<Home />} />
            <Route path="counter" element={<Counter />} />

            <Route path="chapters">
              <Route index element={<h1>List of all Chapters</h1>} />
              <Route path=":chapterId" element={<h1>One Chapter</h1>} />
              <Route path="edit/:chapterId" element={<EditChapterForm />} />
              <Route
                path=":chapterId/policies"
                element={<h1>Policies of a Chapter</h1>}
              />
              <Route
                path=":chapterId/policies/:policyId"
                element={<PolicyDetails />}
              />
              <Route
                path=":chapterId/policies/:policyId/edit"
                element={<EditPolicyAndDependenciesForm />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="reset-password" element={<ResetForgottenPasswordForm />} />
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="unauthenticated" element={<Unauthenticated />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
