import { Role, SignupFormPayload } from "./types";

export const INITIAL_VALUES: SignupFormPayload = {
  userId: "",
  userName: "",
  firstName: "",
  lastName: "",
  departmentId: "",
  email: "",
  password: "",
  roles: null,
};

export enum RoleEnum {
  Admin = "Admin",
  SubAdmin = "Sub-Admin",
  FocalPoint = "Focal Point",
  Staff = "Staff",
}

export const roles: Role[] = [
  {
    name: RoleEnum.Admin,
  },
  {
    name: RoleEnum.SubAdmin,
  },
  {
    name: RoleEnum.FocalPoint,
  },
  {
    name: RoleEnum.Staff,
  },
];
