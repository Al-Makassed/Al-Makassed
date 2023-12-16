import { ReactNode } from "react";
import { WithId } from "src/types";

export interface HalfListProps<T extends object> {
  title: ReactNode;
  items: T[];
  checkedItems: T[];
  onSetCheckedItems: (items: T[]) => void;
  getOptionLabel: (item: T) => string;
}

export interface TransferListProps<T extends object> {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  left: T[];
  right?: T[];
  getOptionLabel?: (item: T) => string;
  loading?: boolean;
  onTransfer?: (left: T[], right: T[]) => void;
}

export interface ListItem {
  id: string;
  label: string;
}

export interface UseTransferListProps<T extends WithId<object>> {
  left: T[];
  right: T[];
}
