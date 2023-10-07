import React, { Suspense, FC } from "react";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="" element={<h1>Hi</h1>} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
