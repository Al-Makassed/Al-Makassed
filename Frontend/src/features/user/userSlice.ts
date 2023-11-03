import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, UserState } from "./types";

const initialState: UserState = {
  userId: "",
  userName: "",
  email: "",
  role: "",
  profileUrl: "",
  token: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { token } = action.payload;
      state.token = token;
      const { userId } = action.payload;
      state.userId = userId;
      const { userName } = action.payload;
      state.userName = userName;
      const { email } = action.payload;
      state.email = email;
      const { role } = action.payload;
      state.role = role;
      const { profileUrl } = action.payload;
      state.profileUrl = profileUrl;
    },
    logout: (state) => {
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
