import type { RootState } from "../../app/store";

export const selectCount = (state: RootState) => state.counter.value;
