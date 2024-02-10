import { useContext } from "react";
import { AccountMenuContext } from "./AccountMenuContext";

const useAccountMenuContext = () => {
  const context = useContext(AccountMenuContext);

  if (!context)
    throw new Error(
      "useAccountMenuContext must be used within an AccountMenuProvider",
    );

  return context;
};

export default useAccountMenuContext;
