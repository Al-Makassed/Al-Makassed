import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * useAppDispatch is a custom hook that is created to provide a type-safe
 * reference to the Redux store's dispatch function. It returns an instance
 * of AppDispatch, which is typically defined in your Redux store configuration.
 */
