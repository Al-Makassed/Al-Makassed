export const noop = () => {};

export const noopArray = () => [];

export const notImplementedYet = () => {
  throw new Error("Not Implemented yet!");
};

export const identity = <T>(v: T) => v;
