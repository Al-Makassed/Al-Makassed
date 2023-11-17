import type { RootState } from "../../store/store";

export const selectCount = (state: RootState) => state.counter.value;
