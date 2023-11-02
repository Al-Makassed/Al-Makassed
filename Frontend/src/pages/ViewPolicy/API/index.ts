import { Policy } from "./types";
import axios from "src/API/axios";

export const getPolicyInformation = async () => {
  return axios.get<Policy[]>("/policies").then((res) => res.data);
};
