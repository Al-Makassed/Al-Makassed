export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  departmentId: string;
  roles: string[];
  phoneNumber: string;
  token: string;
  expiration: string;
  avatarUrl: string | null;
}
