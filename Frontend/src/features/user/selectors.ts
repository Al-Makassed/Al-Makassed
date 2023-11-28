import type { RootState } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";
import { Role } from "src/routes/types";

export const selectUser = (state: RootState) => state.user;

export const selectUserRoles = (state: RootState) => state.user.roles as Role[];

/** For now, a user has one role */
export const selectUserRole = createSelector(
  selectUserRoles,
  (roles) => roles[0],
);

export const selectIsAdminUser = createSelector(
  selectUserRole,
  (role) => role === "Admin",
);

export const selectIsManagerUser = createSelector(
  selectUserRole,
  (role) => role === "Admin" || role === "Sub-Admin",
);

export const selectIsFocalPointUser = createSelector(
  selectUserRole,
  (role) => role === "Focal Point",
);
