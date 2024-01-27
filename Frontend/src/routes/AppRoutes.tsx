import React, { FC, lazy, Suspense } from "react";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/containers/Layout";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import EditChapterDialog from "src/pages/EditChapterDialog";
import EditPolicyAndDependenciesDialog from "src/pages/EditPolicyAndDependenciesDialog";
const ResetPasswordForm = lazy(() => import("src/pages/ResetPassword"));
const DefaultView = lazy(
  () => import("src/pages/PoliciesAndProcedures/components/DefaultView"),
);
const TaskSubmission = lazy(() => import("src/pages/TaskSubmission"));
const LoginPage = lazy(() => import("src/pages/Login"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const Counter = lazy(() => import("src/pages/Counter"));
const Counter2 = lazy(() => import("src/pages/Counter2"));
const PolicyDetails = lazy(() => import("src/pages/PolicyDetails"));
const Unauthenticated = lazy(() => import("src/pages/Unauthenticated"));
const LandingPage = lazy(() => import("src/pages/LandingPage"));
const ForgotPasswordForm = lazy(() => import("src/pages/ForgotPasswordForm"));
const AddMonitoringToolForm = lazy(
  () => import("src/pages/AddMonitoringToolDialog"),
);
const ResetForgottenPasswordForm = lazy(
  () => import("src/pages/ResetForgottenPasswordForm"),
);
const PoliciesAndProcedures = lazy(
  () => import("src/pages/PoliciesAndProcedures"),
);
const MonitoringTools = lazy(() => import("src/pages/MonitoringTools"));
const UserProfile = lazy(() => import("src/pages/UserProfile"));

const DataGridInfinitePlayground = lazy(
  () => import("src/pages/DataGridInfinitePlayground"),
);

const DataGridPaginatedPlayground = lazy(
  () => import("src/pages/DataGridPaginatedPlayground"),
);

const InfiniteScrollPlayground = lazy(
  () => import("src/pages/InfiniteScrollPlayground"),
);

const Dashboard = lazy(() => import("src/pages/Dashboard"));

const Home = lazy(() => import("src/pages/Home"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<BlockUI />}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="" element={<LandingPage />} />

        <Route path="me" element={<AppLayout />}>
          <Route element={<AuthRoute />}>
            <Route index path="" element={<Home />} />
            <Route path="counter" element={<Counter />} />
            <Route path="counter-with-provider" element={<Counter2 />} />

            <Route path="profile" element={<UserProfile />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route
              path="policies-and-procedures"
              element={<PoliciesAndProcedures />}
            >
              <Route path="" element={<DefaultView />} />
              <Route path=":chapterId" element={<EditChapterDialog />} />
              <Route
                path=":chapterId/policies/:policyId"
                element={<PolicyDetails />}
              />
              <Route
                path=":chapterId/policies/edit/:policyId"
                element={<EditPolicyAndDependenciesDialog />}
              />
            </Route>

            <Route path="monitoring-tools">
              <Route index element={<MonitoringTools />} />
              <Route
                path="task/:focalPointTaskId"
                element={<TaskSubmission />}
              />
              <Route path="add" element={<AddMonitoringToolForm />} />
            </Route>
            <Route path="reset-password" element={<ResetPasswordForm />} />
          </Route>
        </Route>

        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="reset-password" element={<ResetForgottenPasswordForm />} />
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="unauthenticated" element={<Unauthenticated />} />
        <Route path="*" element={<NotFound />} />

        {/* Temporary Paths for Testing */}
        <Route
          path="data-grid-infinite"
          element={<DataGridInfinitePlayground />}
        />

        <Route
          path="data-grid-paginated"
          element={<DataGridPaginatedPlayground />}
        />

        <Route path="infinite-scroll" element={<InfiniteScrollPlayground />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
