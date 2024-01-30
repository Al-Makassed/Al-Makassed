import { FilterFn } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateBetween: FilterFn<unknown>;
    fuzzy: FilterFn<unknown>;
  }
}

export {};
