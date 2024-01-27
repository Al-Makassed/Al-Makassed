export interface ResetPasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
