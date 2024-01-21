import { FinishedPolicy } from "./API/types";

/**
 *
 * @param policies list of finished policies
 * @returns list of finished policies in this month
 */
export const getFinishedListInMonth = (policies: FinishedPolicy[]) => {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );
  return policies.filter((policy) => {
    const finishedDate = new Date(policy.lastAccessed);
    return finishedDate > lastMonth;
  });
};

/**
 *
 * @param policies list of finished policies
 * @returns list of finished policies in this week
 */
export const getFinishedListInWeek = (policies: FinishedPolicy[]) => {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
  );
  return policies.filter((policy) => {
    const finishedDate = new Date(policy.lastAccessed);
    return finishedDate > lastWeek;
  });
};

// get the list of finished policies in this month except the list of finished policies in this week
export const getFinishedListInMonthExceptWeek = (
  policies: FinishedPolicy[],
) => {
  const finishedListInMonth = getFinishedListInMonth(policies);
  const finishedListInWeek = getFinishedListInWeek(policies);
  return finishedListInMonth.filter((policy) => {
    return !finishedListInWeek.includes(policy);
  });
};
