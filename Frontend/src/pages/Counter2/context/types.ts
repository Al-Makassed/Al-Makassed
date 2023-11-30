import { ChangeEvent } from "react";

export interface CounterReducerAction {
  type: CounterReducerActionType;
  payload?: string;
}

export enum CounterReducerActionType {
  Increment,
  Decrement,
  NewInput,
}

export interface CounterState {
  count: number;
  text: string;
}

export interface CounterContextValue {
  state: CounterState;
  increment: () => void;
  decrement: () => void;
  handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
