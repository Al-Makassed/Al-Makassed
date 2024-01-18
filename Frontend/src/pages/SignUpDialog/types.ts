export interface SignupFormPayload {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  // fullName: string;
  departmentId: string;
  email: string;
  password: string;
  roles: Role | null;
}

export interface Role {
  name: string;
}
