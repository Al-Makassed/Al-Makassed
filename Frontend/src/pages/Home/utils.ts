import { getReadDependencies, getReadPolicies } from "./API";
import { FileEntityType } from "./API/types";

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getRecentReadFiles = async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const difference = currentDay - 1; // 0 if Sunday, 1 if Monday, etc.

  currentDate.setDate(currentDate.getDate() - difference); // Set the date to the first day of the week

  const [x, y] = await Promise.all([
    getReadPolicies(
      `?Filters=lastAccessed>${formatDateToYYYYMMDD(currentDate)}`,
    ),
    getReadDependencies(
      `?Filters=lastAccessed>${formatDateToYYYYMMDD(currentDate)}`,
    ),
  ]);

  // Wrap single items in an array
  const xArray = Array.isArray(x) ? x : [x];
  const yArray = Array.isArray(y) ? y : [y];

  xArray.forEach((item) => {
    item.type = FileEntityType.Policy;
  });

  yArray.forEach((item) => {
    item.type = FileEntityType.Dependency;
  });

  return [...xArray, ...yArray];
};
