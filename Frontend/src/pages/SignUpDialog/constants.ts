import { Role, SignupFormPayload } from "./types";

export const INITIAL_VALUES: SignupFormPayload = {
  userId: "",
  userName: "",
  fullName: "",
  departmentId: "",
  email: "",
  password: "",
  roles: [""],
};

export const role: Role[] = [
  {
    name: "Admin",
  },
  {
    name: "Sub-Admin",
  },
  {
    name: "Focal Point",
  },
  {
    name: "Staff",
  },
];
