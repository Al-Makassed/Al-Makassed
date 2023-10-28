import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "src/routes/AppRoutes";
import useLanguageSelector from "src/locals/hooks/useLanguageSelector";

const App: FC = () => {
  const queryClient = new QueryClient();

  useLanguageSelector();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
};

export default App;
