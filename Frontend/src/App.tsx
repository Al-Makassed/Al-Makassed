import React, { lazy, Suspense, FC } from "react";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./pages/Navbar"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="header" element={<Navbar />} />
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
