import { matchPath } from "react-router";

export const isProduction = import.meta.env.PROD;

export const isEmptyString = (value: string): boolean =>
  value.trim().length === 0;

export const doesUrlMatchMenuItem = (
  pathName: string,
  windowPathname: string = window.location.pathname,
) => matchPath(windowPathname, pathName) !== null;
