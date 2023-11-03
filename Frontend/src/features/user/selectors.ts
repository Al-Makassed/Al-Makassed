import type { RootState } from "../../app/store";

export const selectAccessUser = (state: RootState) => state.user;
