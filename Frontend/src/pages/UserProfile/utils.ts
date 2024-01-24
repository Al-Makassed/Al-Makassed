import { FinishedFile } from "./API/types";

/**
 *
 * @param policies list of finished policies
 * @returns list of finished policies in this month
 */
const getFinishedListInMonth = (policies: FinishedFile[]) => {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );
  return policies
    .filter((policy) => {
      const finishedDate = new Date(policy.lastAccessed);
      return finishedDate > lastMonth;
    })
    .sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime(),
    );
};

/**
 *
 * @param policies list of finished policies
 * @returns list of finished policies in this week sorted by lastAccessed
 */
export const getFinishedListInWeek = (policies: FinishedFile[]) => {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
  );
  return policies
    .filter((file) => {
      const finishedDate = new Date(file.lastAccessed);
      file.type = file.policy ? "policy" : "dependency";
      return finishedDate > lastWeek;
    })
    .sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime(),
    );
};

/**
 *
 * @param files list of finished files
 * @returns list of finished files in this month except this week sorted by lastAccessed
 */
export const getFinishedListInMonthExceptWeek = (files: FinishedFile[]) => {
  const finishedListInMonth = getFinishedListInMonth(files);
  const finishedListInWeek = getFinishedListInWeek(files);
  return finishedListInMonth.filter((file) => {
    file.type = file.policy ? "policy" : "dependency";
    return !finishedListInWeek.includes(file);
  });
};
