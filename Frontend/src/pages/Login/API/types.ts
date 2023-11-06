export interface User {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  roles: string[];
  profileUrl: string;
  phoneNumber: string;
  token: string;
  expiration: string;
}
