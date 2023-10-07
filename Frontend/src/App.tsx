import React, { lazy, Suspense, FC } from "react";
const Login = lazy(() => import("src/pages/Login"));
const Home = lazy(() => import("src/pages/Home"));

import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
