export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  roles: string[];
  profileUrl: string | null;
  phoneNumber: string;
  token: string;
  expiration: string;
  avatarUrl: string | null;
}
