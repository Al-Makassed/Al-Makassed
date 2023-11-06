import React, { FC } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "src/routes/AppRoutes";
import useLanguageSelector from "src/locale/hooks/useLanguageSelector";
import Snackbar from "./components/Snackbar";
import queryClient from "./cache/queryClient";

const App: FC = () => {
  useLanguageSelector(); // Language selector

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Snackbar />
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
};

export default App;
