export interface UserState {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  profileUrl: string;
}

export interface LoginPayload extends UserState {}
