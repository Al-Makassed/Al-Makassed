import { useContext } from "react";
import { makeColumnFilterDatePicker } from "./ColumnFilterDatePicker";
import { makeColumnFilterNumeric } from "./ColumnFilterNumeric";
import { makeColumnFilterText } from "./ColumnFilterText";
import { makeColumnFilterTextMultiple } from "./ColumnFilterTextMultiple";
import { ColumnFilterProps, CreateDataGridConfig } from "./types";

export function makeColumnFilter<T extends object>(
  configs: CreateDataGridConfig<T>,
) {
  const ColumnFilterText = makeColumnFilterText<T>(configs);
  const ColumnFilterNumeric = makeColumnFilterNumeric<T>(configs);
  const ColumnFilterTextMultiple = makeColumnFilterTextMultiple<T>(configs);
  const ColumnFilterDatePicker = makeColumnFilterDatePicker<T>(configs);

  const ColumnFilter = (props: ColumnFilterProps) => {
    const { columnId, index } = props;
    if (columnId === "") return null;

    const { table } = useContext(configs.Context);

    const column = table.getColumn(columnId);

    const filterFnName = column?.columnDef?.filterFn;

    switch (filterFnName) {
      case "auto":
        return (
          <ColumnFilterText key={index} index={index} columnId={columnId} />
        );
      case "inNumberRange":
        return (
          <ColumnFilterNumeric key={index} index={index} columnId={columnId} />
        );
      case "dateBetween":
        return (
          <ColumnFilterDatePicker
            key={index}
            index={index}
            columnId={columnId}
          />
        );
      case "includesString":
        return (
          <ColumnFilterText key={index} index={index} columnId={columnId} />
        );
      case "arrIncludesSome":
        return (
          <ColumnFilterTextMultiple
            key={index}
            index={index}
            columnId={columnId}
          />
        );
      default:
        return null;
    }
  };

  ColumnFilter.displayName = `${configs.name}.ColumnFilter`;

  return ColumnFilter;
}
