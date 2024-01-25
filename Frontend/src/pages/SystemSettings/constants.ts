import { getDepartment, getField, getUser } from "./API/type";

export const DEPARTMENT_QUERY_KEY = ["Department"];

export const FIELD_QUERY_KEY = ["Field"];

export const USER_QUERY_KEY = ["User"];

export const FOCAL_POINT_QUERY_KEY = ["FocalPoint"];

export const initialValues: getDepartment = {
  name: "",
};

export const FieldInitialValues: getField = {
  content: "",
};

export const UserInitialValues: getUser = {
  Image: undefined,
};

export enum Category {
  Departments = "Departments",
  Fields = "Fields",
  Users = "Users",
}

export enum FieldDialogType {
  ADD,
  EDIT,
  DELETE,
}
