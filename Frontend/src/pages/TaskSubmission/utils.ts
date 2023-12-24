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
  console.log(`${hoursLeft}`);

  // Format the result
  const formattedResult =
    daysLeft > 0
      ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} and ${hoursLeft} hour${
          hoursLeft !== 1 ? "s" : ""
        }`
      : hoursLeft > 0
        ? `${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""}`
        : "Less than an hour";

  return formattedResult;
};
