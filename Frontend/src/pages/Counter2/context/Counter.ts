import { createContext } from "react";
import { noop } from "src/utils/functionsUtils";
import { CounterContextValue, CounterState } from "./types";

export const initialState: CounterState = {
  count: 0,
  text: "",
};

export const CounterContext = createContext<CounterContextValue>({
  state: initialState,
  increment: noop,
  decrement: noop,
  handleTextInput: noop,
});
