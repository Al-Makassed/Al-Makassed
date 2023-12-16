import TextField from "@mui/material/TextField";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { useField } from "formik";
import { BaseAutoCompleteItem } from "./types";

export interface AutocompleteFieldProps<T extends BaseAutoCompleteItem>
  extends Omit<
    MuiAutocompleteProps<T, boolean, boolean, boolean>,
    "renderInput"
  > {
  name: string;
  label: string;
}

const AutocompleteField = <T extends BaseAutoCompleteItem>({
  name,
  label,
  ...rest
}: AutocompleteFieldProps<T>) => {
  const [field, meta] = useField<string>(name);

  const config: Omit<AutocompleteFieldProps<T>, "renderInput" | "label"> = {
    ...field,
    ...rest,
    fullWidth: true,
  };

  let error: boolean;
  let helperText: string;

  if (meta && meta.touched && meta.error) {
    error = true;
    helperText = meta.error;
  }

  return (
    <MuiAutocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            error: error,
          }}
        />
      )}
      {...config}
    />
  );
};

export default AutocompleteField;
