// import axios from "src/API/axios";
import axios from "axios";
import { AddPolicyDependencyResponse } from "./types";

export const addNewDependency = async (dependencyName: string) => {
  return axios
    .post<AddPolicyDependencyResponse>("/PoliciesDependencies", {
      name: dependencyName,
    })
    .then((response) => response.data);
};
