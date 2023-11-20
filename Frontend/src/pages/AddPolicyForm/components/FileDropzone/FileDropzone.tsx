import React, { FC, useCallback } from "react";
import { MAX_FILE_SIZE } from "../../constants";
import { Box, Stack, Grid, Typography, Chip } from "@mui/material";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const FileDropzone: FC = () => {
  const { setFieldValue } = useFormikContext();

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
        <Typography variant="h6">No files have been added</Typography>
        <Typography variant="subtitle1" color="grey.600">
          Add File (PDF) drag and drop your .pdf file here, or browse your
          files.
        </Typography>
        <Typography variant="caption" color="grey.600">
          10 MB file size limit
        </Typography>
      </>
    ),
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [],
      },
      maxSize: MAX_FILE_SIZE, // 10 MB
      multiple: false,
    });

  const handleFileUpload = (file: File) => {
    setFieldValue("MainFile", file);
  };

  return (
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
            backgroundColor: (theme) => theme.palette.grey[100],
            "&:hover": {
              backgroundColor: (theme) => theme.palette.grey[200],
            },
          }}
        >
          {isDragActive ? dropzoneContent.drag : dropzoneContent.noDrag}
        </Stack>
        <Grid container sx={{ mt: 2 }} gap={1}>
          {acceptedFiles.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              icon={<AttachFileIcon />}
              color="primary"
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default FileDropzone;
