export interface User {
  userId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
}
