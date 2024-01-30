import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "src/containers/BlockUI";

// routes
import PublicRoutes from "./PublicRoutes";
import LoginRoutes from "./LoginRoutes";
import TemporaryRoutes from "./TemporaryRoutes";

const AppRoutes = () => {
  const appRoutes = useRoutes([PublicRoutes, LoginRoutes, TemporaryRoutes]);

  return <Suspense fallback={<Loader />}>{appRoutes}</Suspense>;
};

export default AppRoutes;
