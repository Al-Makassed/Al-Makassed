import React, { FC, PropsWithChildren } from "react";
import MaqasidThemeProvider from "../style/MaqasidThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaqasidThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          {children}
        </QueryClientProvider>
      </Provider>
    </MaqasidThemeProvider>
  );
};

export default ThemeProvider;
