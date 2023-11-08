import { CreatePolicyResponse } from "./types";
import axios from "src/API/axios";

export const createPolicy = (policyName: string) => {
  return axios
    .post<CreatePolicyResponse>("/policies", { name: policyName })
    .then((res) => res.data);
};

// export const getChapters = async () => {
//   return axios.get<Chapter[]>("/chapters").then((res) => res.data);
// };
