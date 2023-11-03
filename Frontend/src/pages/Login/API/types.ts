export interface User {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName: string;
  email: string;
  role: string;
  profileUrl: string;
  token: string;
  expiration: string;
}
