import { noop } from "@tanstack/react-table";
import { createContext } from "react";

export interface AccountContextValues {
  onClose: () => void;
  onLogOut: () => void;
}

export const AccountContext = createContext<AccountContextValues>({
  onClose: noop,
  onLogOut: noop,
});
