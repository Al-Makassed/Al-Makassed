import { Submission } from "./API/types";

/**
 * Calculate the total time (days and hours) left in the current month.
 * @returns {string} A string representing the time left in the format "X days, Y hours".
 */
export const totalTimeLeftInMonth = (): string => {
  // Get the current date
  const currentDate = new Date();

  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  // Calculate the total number of days in the month
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Calculate the number of days left
  const daysLeft = totalDaysInMonth - currentDate.getDate();

  // Calculate the number of hours left
  const hoursLeft = 24 - currentDate.getHours() - 1; // Subtract 1 to account for the current hour

  // Format the result
  const formattedResult =
    daysLeft > 0
      ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} ${
          hoursLeft > 0
            ? `and ${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""}`
            : ""
        }`
      : hoursLeft > 0
        ? `${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""}`
        : "Less than an hour";

  return formattedResult;
};

/**
 * Finds and returns submissions that belong to the current month.
 *
 * @param {Submission[]} submissions - The array of submissions to filter.
 * @return {Submission[]} - An array containing submissions that belong to the current month.
 */
export const findCurrentMonthSubmissions = (submissions: Submission[]) => {
  const currentMonth = new Date().getMonth();
  return submissions.filter(
    (submission) =>
      new Date(submission.submittedAt).getMonth() === currentMonth,
  );
};

/**
 * Finds and returns submissions that belong to the previous months.
 *
 * @param {Submission[]} submissions - The array of submissions to filter.
 * @return {Submission[]} - An array containing submissions that belong to the previous months.
 */
export const findOlderSubmissions = (submissions: Submission[]) => {
  const currentMonth = new Date().getMonth();
  return submissions.filter(
    (submission) => new Date(submission.submittedAt).getMonth() != currentMonth,
  );
};

// check if the submission is from the current month
/**
 *
 * @param {string} submittedAt
 * @returns {boolean} - A boolean value indicating whether the submission is from the current month.
 */
export const isCurrentMonthSubmission = (submittedAt: string) => {
  const currentMonth = new Date().getMonth();
  return new Date(submittedAt).getMonth() === currentMonth;
};
