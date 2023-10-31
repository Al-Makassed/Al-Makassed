import React, { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "src/routes/AppRoutes";
import useLanguageSelector from "src/locals/hooks/useLanguageSelector";
import Snackbar from "./components/Snackbar";
import { useDispatch } from "react-redux";
import { userLogin } from "src/features/user";
const App: FC = () => {
  const queryClient = new QueryClient();

  useLanguageSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(userLogin(localStorage.getItem("accessToken")));
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Snackbar />
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
};

export default App;
