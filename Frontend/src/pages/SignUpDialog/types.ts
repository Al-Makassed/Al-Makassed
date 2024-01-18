export interface SignupFormPayload {
  userId: string;
  userName: string;
  fullName: string;
  departmentId: string;
  email: string;
  password: string;
  roles: string[];
}

export interface Role {
  name: string;
}
