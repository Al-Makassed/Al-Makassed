import { CreatePolicyResponse, PolicyResponse } from "./types";
import axios from "src/API/axios";

export const createPolicy = async ({
  name,
  pdfUrl,
  estimatedTime,
  chapterId,
}: PolicyResponse) => {
  return axios
    .post<CreatePolicyResponse>("/policies", {
      name: name,
      pdfUrl: pdfUrl,
      estimatedTime: estimatedTime,
      chapterId: chapterId,
      Headers: { "content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};
