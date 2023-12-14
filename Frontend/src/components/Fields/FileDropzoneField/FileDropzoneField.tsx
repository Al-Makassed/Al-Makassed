import React, { FC, useCallback, useEffect, useState } from "react";
import { MAX_FILE_SIZE } from "./constants";
import { Box, Stack, Grid, Typography, Chip } from "@mui/material";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { FileDropzoneFieldProps } from "./types";

const FileDropzoneField: FC<FileDropzoneFieldProps> = ({
  multiple = false,
  name,
}) => {
  const { setFieldValue, dirty } = useFormikContext();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const dropzoneContent = {
    drag: (
      <>
        <SimCardDownloadIcon color="primary" fontSize="large" />
        <Typography variant="h6" color="primary">
          Drop file here...
        </Typography>
      </>
    ),
    noDrag: (
      <>
        <Typography variant="body1" color="grey.600">
          Drag then drop your .pdf file here, or browse your files.
        </Typography>
        <Typography variant="caption" color="grey.600">
          10 MB file size limit
        </Typography>
      </>
    ),
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileUpload(acceptedFiles);
  }, []);

  const onFileDialogOpen = useCallback(() => {
    setFieldValue(name, undefined);
    clearAcceptedFiles();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onFileDialogOpen,
    accept: {
      "application/pdf": [],
    },
    maxSize: MAX_FILE_SIZE, // 10 MB
    multiple,
  });

  const handleFileUpload = (files: File[]) => {
    const updatedFiles = multiple ? [...acceptedFiles, ...files] : files;
    setFieldValue(name, multiple ? updatedFiles : files[0]);
    setAcceptedFiles(updatedFiles);
  };

  const clearAcceptedFiles = () => {
    setAcceptedFiles([]);
    setFieldValue(name, undefined);
  };

  const deleteFile = (index: number) => {
    if (acceptedFiles.length <= 1) {
      clearAcceptedFiles();
      return;
    }
    const updatedFiles = acceptedFiles.filter((_, i) => i !== index);
    setAcceptedFiles(updatedFiles);
    setFieldValue(name, updatedFiles);
  };

  useEffect(() => {
    if (!dirty) clearAcceptedFiles();
  }, [dirty]);

  return (
    <Stack gap={1}>
      <Box {...getRootProps()}>
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <input {...getInputProps()} />
          <Stack
            gap={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              minHeight: 110,
              border: "1px dashed",
              borderColor: (theme) => theme.palette.grey[400],
              borderRadius: 2,
              padding: (theme) => theme.spacing(2),
              cursor: "pointer",
              bgcolor: (theme) => theme.palette.grey[100],
              "&:hover": {
                bgcolor: (theme) => theme.palette.grey[200],
              },
            }}
          >
            {acceptedFiles.length === 0 && (
              <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                No files have been added
              </Typography>
            )}
            {acceptedFiles.length > 0 && (
              <Typography
                variant="h6"
                sx={{ fontSize: "1.1rem" }}
                color="primary"
              >
                {acceptedFiles.length} File(s) selected
              </Typography>
            )}
            {isDragActive ? dropzoneContent.drag : dropzoneContent.noDrag}
          </Stack>
        </Stack>
      </Box>
      <Grid container gap={1}>
        {acceptedFiles.map((file, index) => (
          <Chip
            onDelete={() => deleteFile(index)}
            key={index}
            label={file.name}
            icon={<AttachFileIcon />}
            color="primary"
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default FileDropzoneField;
