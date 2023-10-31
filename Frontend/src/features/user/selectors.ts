import type { RootState } from "../../app/store";

export const selectAccessToken = (state: RootState) => state.user.token;
