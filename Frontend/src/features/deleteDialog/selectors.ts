import type { RootState } from "../../store/store";

export const selectIsDialogOpen = (state: RootState) =>
  state.deleteDialog.isOpen;
