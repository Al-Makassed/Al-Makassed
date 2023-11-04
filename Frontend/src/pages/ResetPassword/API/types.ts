export interface forgotResetPassword {
  password: string;
  confirmPassword: string;
  email: string | null;
  encodedToken: string | null;
}
