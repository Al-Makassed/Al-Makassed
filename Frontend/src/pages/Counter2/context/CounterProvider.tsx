import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useReducer,
} from "react";
import { CounterContext, initialState } from "./Counter";
import {
  CounterContextValue,
  CounterReducerAction,
  CounterReducerActionType,
  CounterState,
} from "./types";

const CounterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = useCallback(
    () => dispatch({ type: CounterReducerActionType.Increment }),
    [],
  );

  const decrement = useCallback(
    () => dispatch({ type: CounterReducerActionType.Decrement }),
    [],
  );

  const handleTextInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: CounterReducerActionType.NewInput,
        payload: e.target.value,
      }),
    [],
  );

  const counterContextValue: CounterContextValue = {
    state,
    increment,
    decrement,
    handleTextInput,
  };

  return (
    <CounterContext.Provider value={counterContextValue}>
      {children}
    </CounterContext.Provider>
  );
};

export const reducer = (
  state: CounterState,
  action: CounterReducerAction,
): CounterState => {
  switch (action.type) {
    case CounterReducerActionType.Increment:
      return {
        ...state,
        count: state.count + 1,
      };
    case CounterReducerActionType.Decrement:
      return {
        ...state,
        count: state.count - 1,
      };
    case CounterReducerActionType.NewInput:
      return {
        ...state,
        text: action.payload ?? "",
      };
    default:
      return state;
  }
};

export default CounterProvider;
