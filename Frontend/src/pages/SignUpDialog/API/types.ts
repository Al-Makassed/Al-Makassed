export interface SignUpRequest {
  userId: string;
  userName: string;
  fullName: string;
  departmentId: string;
  email: string;
  password: string;
  roles: string[];
}
export interface SignUpResponse {
  message: string;
}
