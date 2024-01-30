import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// container routes
import AppLayout from "src/containers/Layout";
import AuthRoute from "./AuthRoute";

// routes
import EditChapterDialog from "src/pages/EditChapterDialog";
import EditPolicyAndDependenciesDialog from "src/pages/EditPolicyAndDependenciesDialog";
const ResetPasswordForm = lazy(() => import("src/pages/ResetPassword"));
const DefaultView = lazy(
  () => import("src/pages/PoliciesAndProcedures/components/DefaultView"),
);
const TaskSubmission = lazy(() => import("src/pages/TaskSubmission"));
const PolicyDetails = lazy(() => import("src/pages/PolicyDetails"));
const PoliciesAndProcedures = lazy(
  () => import("src/pages/PoliciesAndProcedures"),
);
const MonitoringTools = lazy(() => import("src/pages/MonitoringTools"));
const UserProfile = lazy(() => import("src/pages/UserProfile"));
const Dashboard = lazy(() => import("src/pages/Dashboard"));
const Home = lazy(() => import("src/pages/Home"));
const RequestsApproval = lazy(() => import("src/pages/RequestsApproval"));

/**
 * @description Routes that require login
 */
const loginRoutes: RouteObject = {
  path: "/me",
  element: <AppLayout />,
  children: [
    {
      element: <AuthRoute />,
      children: [
        {
          index: true,
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "reset-password",
          element: <ResetPasswordForm />,
        },
        {
          path: "policies-and-procedures",
          element: <PoliciesAndProcedures />,
          children: [
            {
              index: true,
              path: "",
              element: <DefaultView />,
            },
            {
              path: ":chapterId",
              element: <EditChapterDialog />,
            },
            {
              path: ":chapterId/policies",
              children: [
                {
                  path: ":policyId",
                  element: <PolicyDetails />,
                },
                {
                  path: "edit/:policyId",
                  element: <EditPolicyAndDependenciesDialog />,
                },
              ],
            },
          ],
        },
        {
          path: "monitoring-tools",
          children: [
            {
              index: true,
              element: <MonitoringTools />,
            },
            {
              path: "task/:focalPointTaskId",
              element: <TaskSubmission />,
            },
          ],
        },
        {
          path: "requests-approval",
          element: <RequestsApproval />,
        },
      ],
    },
  ],
};

export default loginRoutes;
