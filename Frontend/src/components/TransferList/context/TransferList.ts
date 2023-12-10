import { createContext } from "react";
import { noop } from "src/utils/functionsUtils";
import { TransferListContextValue } from "./types";

export const TransferListContext = createContext<TransferListContextValue>({
    checked: [],
    leftChecked: [],
    rightChecked: [],
    onCheckLeft: noop,
    onCheckRight: noop,
    onToggle: noop,
    onToggleAll: noop,
});
