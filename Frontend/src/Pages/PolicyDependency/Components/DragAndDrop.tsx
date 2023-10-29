import {
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import usePostDependency from "../hooks/usePostDependency";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DragAndDropProps } from "../API/types";
import AddIcon from "@mui/icons-material/Add";

const ALLOWED_FILE_EXTENSIONS = ["pdf"];

const DragAndDrop: FC<DragAndDropProps> = ({ name }) => {
  const [file, setFile] = useState<File | null>();
  const [dependency, setDependency] = useState<string>("");

  const handleChange = (file: File) => {
    setFile(file);
  };

  const handleChangeDependencyName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDependency(e.target.value);
  };

  const { addDependency } = usePostDependency();

  const handleAddDependency = () => {
    addDependency(dependency);
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="files"
        types={ALLOWED_FILE_EXTENSIONS}
        label="Upload or drop a file right here"
      />
      <Typography py={2}>
        {file ? `File name: ${file.name}` : "no files uploaded yet"}
      </Typography>

      <Box>
        <Stack direction="row" gap={3}>
          <TextField
            label={`${name} name`}
            variant="outlined"
            size="small"
            value={dependency}
            onChange={handleChangeDependencyName}
          />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            label="time"
            variant="outlined"
            size="small"
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
            onClick={handleAddDependency}
            sx={{ my: 3 }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default DragAndDrop;
