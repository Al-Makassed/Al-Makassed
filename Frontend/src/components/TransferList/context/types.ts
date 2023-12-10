import { ListItem } from "../types";

export interface TransferListContextValue {
    checked: ListItem[],
    leftChecked: ListItem[],
    rightChecked: ListItem[],
    getNumberOfChecked: (items: ListItem[]) => number,
    onToggle: (value: number) => void,
    onToggleAll: (items: ListItem[]) => void,
    onCheckRight: () => void,
    onCheckLeft: () => void,
}