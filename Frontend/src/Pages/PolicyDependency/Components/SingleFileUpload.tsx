import React, { useEffect, useState } from "react";
import { Grid, LinearProgress } from "@mui/material";
import DeleteFile from "./DeleteFile";

export interface SingleFileUploadProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

const SingleFileUpload = ({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      console.log("url", url);
      onUpload(file, url);
    }
    upload();
  }, []);
  return (
    <Grid item spacing={5}>
      <DeleteFile file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
      {/* <div >{progress}</div> */}
    </Grid>
  );
};

export default SingleFileUpload;

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
}
