import { ListItem } from "./types";

/**
 * Returns items that are present in sourceArray but not in comparisonArray based on their `id` property.
 *
 * @param {readonly ListItem[]} sourceArray - The source array.
 * @param {readonly ListItem[]} comparisonArray - The array to compare against.
 * @returns {ListItem[]} An array containing items from sourceArray that are not present in comparisonArray.
 */
export const not = (
  sourceArray: readonly ListItem[],
  comparisonArray: readonly ListItem[],
) => {
  return sourceArray.filter(
    (source) =>
      comparisonArray.findIndex((comp) => comp.id === source.id) === -1,
  );
};

/**
 * Returns items that are present in BOTH sourceArray AND comparisonArray based on their `id` property.
 *
 * @param {readonly ListItem[]} sourceArray - The source array.
 * @param {readonly ListItem[]} comparisonArray - The array to compare against.
 * @returns {ListItem[]} An array containing items from sourceArray that are also present in comparisonArray.
 */
export const intersection = (
  sourceArray: readonly ListItem[],
  comparisonArray: readonly ListItem[],
) => {
  return sourceArray.filter(
    (source) =>
      comparisonArray.findIndex((comp) => comp.id === source.id) !== -1,
  );
};

/**
 * Returns the union of two arrays based on their `id` property, eliminating duplicates.
 *
 * @param {readonly ListItem[]} a - The first array.
 * @param {readonly ListItem[]} b - The second array.
 * @returns {ListItem[]} An array containing unique items from both array `a` and array `b`.
 */
export const union = (a: readonly ListItem[], b: readonly ListItem[]) => {
  return [...a, ...not(b, a)];
};
