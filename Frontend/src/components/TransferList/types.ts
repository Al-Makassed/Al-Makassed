import { ReactNode } from "react";

export interface HalfListProps {
  title: ReactNode;
  items: ListItem[];
  checkedItems: ListItem[];
  onSetCheckedItems: (items: ListItem[]) => void;
  getOptionLabel?: (item: ListItem) => string;
}

export interface TransferListProps {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  left: ListItem[];
  right?: ListItem[];
  getOptionLabel?: (item: ListItem) => string;
}

export interface ListItem {
  id: string;
  label: string;
}
