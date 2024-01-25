import React, { FC, ChangeEvent } from "react";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { useField, FieldAttributes } from "formik";

type TextFieldProps = Omit<MuiTextFieldProps, "name"> & {
  name: string;
  parse?: (value: any) => any;
  format?: (value: any) => any;
};

const ArrayTextField: FC<TextFieldProps> = ({
  name,
  parse,
  format,
  ...rest
}) => {
  const [field, meta, helpers] = useField<string>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Apply custom parse function if provided
    const parsedValue = parse ? parse(value) : value;

    // Set the Formik field value using the custom parsed value
    helpers.setValue(parsedValue);
  };

  // Apply custom format function to the value to be displayed
  const displayValue = format ? format(field.value) : field.value;

  const configTextField: FieldAttributes<any> = {
    ...field,
    ...rest,
    fullWidth: true,
    value: displayValue,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <MuiTextField {...configTextField} />;
};

export default ArrayTextField;
