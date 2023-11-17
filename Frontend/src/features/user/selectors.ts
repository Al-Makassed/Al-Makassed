import type { RootState } from "../../store/store";

export const selectUser = (state: RootState) => state.user;

export const selectUserRoles = (state: RootState) => state.user.roles;
