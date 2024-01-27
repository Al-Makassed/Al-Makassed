import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const useAccountContext = () => {
  const context = useContext(AccountContext);

  if (!context)
    throw new Error("useAccountContext must be used within an AccountProvider");

  return context;
};

export default useAccountContext;
