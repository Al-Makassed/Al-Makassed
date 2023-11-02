import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const protectedRoute = () => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default protectedRoute;
