import type { RootState } from "../../app/store";

export const selectUser = (state: RootState) => state.user;
