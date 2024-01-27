import React, { FC } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import AppRoutes from "src/routes/AppRoutes";
import AppRoutes from "src/routes";
import useLanguageSelector from "src/locale/hooks/useLanguageSelector";
import Snackbar from "./components/Snackbar";
import queryClient from "./cache/queryClient";

const App: FC = () => {
  useLanguageSelector();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Snackbar />
      <ReactQueryDevtools
        initialIsOpen={false}
        position="left"
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
};

export default App;
