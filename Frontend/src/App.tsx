import React, { lazy, Suspense, FC } from "react";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./pages/Header"));

import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="header" element={<Header />} />
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
