import { ReactNode } from "react";

export interface HalfListProps {
    title: ReactNode,
    items: ListItem[]
}

export interface TransferListProps {
    leftTitle: ReactNode,
    rightTitle: ReactNode,
    leftList: ListItem[];
    rightList: ListItem[];
}

export interface ListItem {
    id: string,
    label: string
}