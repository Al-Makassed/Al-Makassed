import React from "react";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { SimpleDialogProps } from "./AddChapter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import axios from "axios";

const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const [chapter, setChapter] = useState<string>("");
  // console.log(chapter);
  const postChapter = async () => {
    await axios.post("https://maqasid.azurewebsites.net/api/Chapters", {
      name: chapter,
    });
  };

  return (
    <Dialog
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="3em"
        sx={{ color: (theme) => theme.palette.maqasid.primary }}
      >
        <AddCircleIcon fontSize="large" />
        <DialogTitle
          variant="h5"
          sx={{
            // color: (theme) => theme.palette.maqasid.primary,
            fontWeight: "3em",
          }}
        >
          Add Chapter
        </DialogTitle>
        <Stack padding="1em">
          <TextField
            id="outlined-basic"
            label="Add Chapter"
            variant="outlined"
            placeholder="Add Chapter"
            color="success"
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
            }}
          />
        </Stack>

        <Button
          variant="contained"
          onClick={postChapter}
          sx={{
            background: (theme) => theme.palette.maqasid.primary,
            "&:hover": {
              backgroundColor: "ButtonShadow",
            },
          }}
        >
          Add
        </Button>
      </Stack>
    </Dialog>
  );
};
export default SimpleDialog;
