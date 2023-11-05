import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  token: "",
};

interface LoginPayload {
  token: string;
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
