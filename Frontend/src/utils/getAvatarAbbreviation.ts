const getAvatarAbbreviation = (name: string = "") => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default getAvatarAbbreviation;
