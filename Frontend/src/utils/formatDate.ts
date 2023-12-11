export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dateObj);
};

export default formatDate;
