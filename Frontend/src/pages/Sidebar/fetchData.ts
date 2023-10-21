import axios from "axios";

export const fetchData = async () => {
  try {
    const { data } = await axios.get(
      "https://maqasid.azurewebsites.net/api/Chapters",
    );
    return data;
  } catch (error) {
    throw new Error("Error fetching chapters");
  }
};
