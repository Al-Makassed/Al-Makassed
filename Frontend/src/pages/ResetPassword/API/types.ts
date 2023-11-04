export interface forgotResetPassword {
  password: string;
  confirmPassword: string;
  email: string | null;
  token: string | null;
}
