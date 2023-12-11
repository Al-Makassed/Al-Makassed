import { WithId } from "src/types";

/**
 * Returns items that are present in sourceArray but not in comparisonArray based on their `id` property.
 *
 * @param {readonly T[]} sourceArray - The source array.
 * @param {readonly T[]} comparisonArray - The array to compare against.
 * @returns {T[]} An array containing items from sourceArray that are not present in comparisonArray.
 */
export const not = <T extends WithId<object>>(
  sourceArray: readonly T[],
  comparisonArray: readonly T[],
) => {
  return sourceArray.filter(
    (source) =>
      comparisonArray.findIndex((comp) => comp.id === source.id) === -1,
  );
};

/**
 * Returns items that are present in BOTH sourceArray AND comparisonArray based on their `id` property.
 *
 * @param {readonly T[]} sourceArray - The source array.
 * @param {readonly T[]} comparisonArray - The array to compare against.
 * @returns {T[]} An array containing items from sourceArray that are also present in comparisonArray.
 */
export const intersection = <T extends WithId<object>>(
  sourceArray: readonly T[],
  comparisonArray: readonly T[],
) => {
  return sourceArray.filter(
    (source) =>
      comparisonArray.findIndex((comp) => comp.id === source.id) !== -1,
  );
};

/**
 * Returns the union of two arrays based on their `id` property, eliminating duplicates.
 *
 * @param {readonly T[]} a - The first array.
 * @param {readonly T[]} b - The second array.
 * @returns {T[]} An array containing unique items from both array `a` and array `b`.
 */
export const union = <T extends WithId<object>>(
  a: readonly T[],
  b: readonly T[],
) => {
  return [...a, ...not(b, a)];
};
