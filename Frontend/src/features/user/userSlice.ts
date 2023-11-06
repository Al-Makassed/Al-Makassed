import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, LoginPayload } from "./types";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";

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
    logout: (state) => {
      state = initialState;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
