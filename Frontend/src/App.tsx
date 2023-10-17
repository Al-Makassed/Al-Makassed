import React, { lazy, Suspense, FC } from "react";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./pages/Navbar"));

import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="header" element={<Navbar />} />
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
