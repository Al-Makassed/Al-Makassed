import React, { Suspense, FC } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";

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
