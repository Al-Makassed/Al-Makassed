import {
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import usePostDependency from "../hooks/usePostDependency";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export interface PROPS {
  name: string;
}
const fileTypes = ["pdf"];

const DragAndDrop: FC<PROPS> = ({ name }) => {
  const [file, setFiles] = useState<File | null>();
  const [dependency, setDependency] = useState<string>("");

  const handleChange = (file: File) => {
    setFiles(file);
  };
  const { addNewDependency } = usePostDependency();

  const handleAddDependency = () => {
    addNewDependency(dependency);
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="files"
        types={fileTypes}
        label="Upload or drop a file right here"
      />
      <Typography py={2}>
        {file ? `File name: ${file.name}` : "no files uploaded yet"}
      </Typography>

      <Box>
        <Stack direction="row" gap={3}>
          <TextField
            id="outlined-basic"
            label={`${name} name`}
            variant="outlined"
            size="small"
            // placeholder="e.g. My awesome chapter"
            value={dependency}
            onChange={(e) => {
              setDependency(e.target.value);
            }}
          />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            id="outlined-basic"
            label="time"
            variant="outlined"
            size="small"
            // value={dependency}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
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
