import React, { Fragment, useCallback, useState, useEffect } from "react";
import { useField } from "formik";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import SingleFileUpload from "./SingleFileUpload";
import { Grid } from "@mui/material";

export interface uploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

const MultipleFileUpload = ({ name }: { name: string }) => {
  const [, , helpers] = useField(name);
  const [files, setFiles] = useState<uploadableFile[]>([]);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      }),
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <Fragment>
      <Grid>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </Grid>
      {files.map((fileWrapper, idx) => (
        <Grid item key={idx}>
          {fileWrapper.errors.length ? (
            // <UploadError
            //   file={fileWrapper.file}
            //   errors={fileWrapper.errors}
            //   onDelete={onDelete}
            // />
            <div>error</div>
          ) : (
            <SingleFileUpload
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
              key={idx}
            />
          )}
        </Grid>
      ))}
    </Fragment>
  );
};

export default MultipleFileUpload;
