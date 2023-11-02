import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
