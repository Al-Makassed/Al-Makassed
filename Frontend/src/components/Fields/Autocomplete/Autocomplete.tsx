import React, { FC } from "react";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { useField } from "formik";

type AutocompleteProps = Omit<
  MuiAutocompleteProps<
    any,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  "name"
> & {
  name: string;
};

const Autocomplete: FC<AutocompleteProps> = ({ name, ...rest }) => {
  const [field] = useField<any>({ name });

  const configAutocomplete = {
    ...field,
    ...rest,
  };

  return <MuiAutocomplete {...configAutocomplete} />;
};

export default Autocomplete;
