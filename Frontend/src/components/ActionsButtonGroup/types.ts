import { ReactElement } from "react";

export interface ActionsButtonGroupProps {
  options: Option[];
}

export interface Option {
  label: string;
  icon?: ReactElement;
  onClick: () => void;
}
