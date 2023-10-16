import React, { Suspense, FC } from "react"; // lazy deleted
// const Login = lazy(() => import("./pages/Login"));
// const Home = lazy(() => import("./pages/Home"));
// const Header = lazy(() => import("./pages/Header"));

import { Routes, Route } from "react-router-dom";
import PolicesAndProcedures from "./pages/Polices&Procedures/Polices&Procedures";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route path="header" element={<Header />} />
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} /> */}
        <Route path="" element={<PolicesAndProcedures />} />
      </Routes>
    </Suspense>
  );
};

export default App;
