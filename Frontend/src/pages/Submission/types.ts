import { Field, FocalPointTask } from "./API/types";

export interface HeaderProps {
  focalPointTask: FocalPointTask;
}

export interface FieldsListProps {
  fields: Field[];
}

export interface FieldCardProps {
  field: Field;
}
