export interface UserState {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  departmentId: string;
  phoneNumber: string;
  roles: string[];
  avatarUrl: string;
  isAdmin: boolean;
}

export interface LoginPayload extends Omit<UserState, "isAdmin"> {}
