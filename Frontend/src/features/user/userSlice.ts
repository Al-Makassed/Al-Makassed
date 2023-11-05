import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  token: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      // Assuming the action.payload contains the new token value
      state.token = action.payload;
    },
    userLogout: (state) => {
      state.token = "";
    },
  },
});
export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
