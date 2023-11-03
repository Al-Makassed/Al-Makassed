import React, {
  FC,
  //  useEffect
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "src/routes/AppRoutes";
import useLanguageSelector from "src/locals/hooks/useLanguageSelector";
import Snackbar from "./components/Snackbar";
// import { login } from "src/features/user";
// import { useAppDispatch } from "./app/hooks";

const App: FC = () => {
  const queryClient = new QueryClient();
  // const dispatch = useAppDispatch();

  useLanguageSelector();

  // when refresh for page don't clean the redux token
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     dispatch(
  //       login({
  //         token: localStorage.getItem("accessToken") ?? "",
  //       }),
  //     );
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Snackbar />
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
};

export default App;
