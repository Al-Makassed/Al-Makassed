import { CreatePolicyResponse, PolicyResponse } from "./types";
import axios from "src/API/axios";

export const createPolicy = async ({
  name,
  file,
  estimatedTime,
  chapterId,
}: PolicyResponse) => {
  const fd = new FormData();
  fd.append("file", file);
  // const pdfFile = fd.get("pdfUrl") as string | Blob;
  return await axios
    .post<CreatePolicyResponse>("/policies", {
      name,
      fd,
      estimatedTime,
      chapterId,
      Headers: { "content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};
