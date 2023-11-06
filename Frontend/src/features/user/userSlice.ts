import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, UserState } from "./types";

const initialState: UserState = {
  userId: "",
  userName: "",
  fullName: "",
  email: "",
  roles: [""],
  profileUrl: "",
  phoneNumber: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const {
        userId,
        userName,
        fullName,
        email,
        roles,
        profileUrl,
        phoneNumber,
      } = action.payload;

      state.userId = userId;
      state.userName = userName;
      state.fullName = fullName;
      state.email = email;
      state.roles = roles;
      state.profileUrl = profileUrl;
      state.phoneNumber = phoneNumber;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
