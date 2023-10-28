import axios from "axios";
// import {Chapter} from "../types";

export const postDependency = async (dependencyName: string) => {
  const { data } = await axios.post(
    "https://maqasid.azurewebsites.net/api/PoliciesDependencies",
    { name: dependencyName },
  );
  return data;
};

// export const getChapters = async (): Promise<Chapter[]> => {
//   const { data } = await axios.get(
//     "https://maqasid.azurewebsites.net/api/Chapters"
//   );
//   return data;
// };
