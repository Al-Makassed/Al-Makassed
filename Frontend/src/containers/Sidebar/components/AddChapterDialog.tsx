import React, { FC, useState } from "react";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { AddChapterDialogProps } from "../types";
import AddIcon from "@mui/icons-material/Add";
import useSidebarAPI from "../hooks/useSidebarAPI";

const AddChapterDialog: FC<AddChapterDialogProps> = ({ onClose, open }) => {
  const [chapter, setChapter] = useState<string>("");

  const { addNewChapter } = useSidebarAPI();

  const closeDialog = () => onClose();

  const handleAddChapter = () => {
    addNewChapter(chapter);
    closeDialog();
  };
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          minWidth: 350,
        },
      }}
      aria-labelledby="responsive-dialog-title"
      onClose={closeDialog}
      open={open}
    >
      <DialogTitle
        variant="h5"
        sx={{
          fontWeight: "500",
        }}
      >
        Add Chapter
      </DialogTitle>
      <Stack padding="1em" gap={2}>
        <TextField
          id="outlined-basic"
          label="Add Chapter"
          variant="outlined"
          placeholder="e.g. My awesome chapter"
          value={chapter}
          onChange={(e) => {
            setChapter(e.target.value);
          }}
        />
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddChapter}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default AddChapterDialog;
