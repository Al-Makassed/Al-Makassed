import { createContext } from "react";
import { noop } from "src/utils";

export interface AccountMenuContextValues {
  onClose: () => void;
  onLogOut: () => void;
}

export const AccountMenuContext = createContext<AccountMenuContextValues>({
  onClose: noop,
  onLogOut: noop,
});
