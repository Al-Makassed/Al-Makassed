import TextField from "@mui/material/TextField";
import { SyntheticEvent, useContext, useMemo } from "react";
import {
  ColumnFilterTextMultipleProps,
  CreateDataGridConfig,
} from "src/components/DataGrid/types";
import MultiSelectAutoComplete from "src/components/Inputs/MultiSelectAutoComplete";
import theme from "src/style/maqasidTheme";

export function makeColumnFilterTextMultiple<T extends object>(
  configs: CreateDataGridConfig<T>,
) {
  const ColumnFilterTextMultiple = ({
    columnId,
    index,
  }: ColumnFilterTextMultipleProps) => {
    if (columnId === "") return null;

    const { table, onSetColumnFilters } = useContext(configs.Context);

    const column = table.getColumn(columnId);

    if (!column) return null;

    const sortedUniqueValues = useMemo(
      () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
      [column.getFacetedUniqueValues()],
    );

    const columnFilterValue = column?.getFilterValue();

    const handleOnChange = (
      event: SyntheticEvent<Element, Event>,
      values: string[],
    ) => {
      console.log(values);
      onSetColumnFilters((prev) =>
        prev.map((cf, idx) => {
          if (idx === index)
            return { ...cf, value: Array.isArray(values) ? values : [values] };
          return cf;
        }),
      );
    };

    return (
      <MultiSelectAutoComplete<string>
        limitTags={2}
        fullWidth
        freeSolo
        value={Array.isArray(columnFilterValue) ? columnFilterValue : []}
        size="small"
        disablePortal
        options={sortedUniqueValues}
        sx={{
          "& .MuiAutocomplete-listbox": {
            ...theme.mixins.niceScroll(),
          },
        }}
        // getOptionLabel={(option) => typeof option === "string" ? option : option.name}
        renderInput={(params) => <TextField {...params} label="Value" />}
        onChange={handleOnChange}
      />
    );
  };

  ColumnFilterTextMultiple.displayName = "ColumnFilterTextMultiple";

  return ColumnFilterTextMultiple;
}
