import { FC, InputHTMLAttributes, useEffect, useState } from "react";

export interface DebouncedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

const DebouncedInput: FC<DebouncedInputProps> = (props) => {
  const { value: initialValue, onChange, debounce = 500, ...rest } = props;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input {...rest} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export default DebouncedInput;
