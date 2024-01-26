export const isProduction = import.meta.env.PROD;

export const isEmptyString = (value: string): boolean =>
  value.trim().length === 0;
