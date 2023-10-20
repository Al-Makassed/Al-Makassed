import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { SimpleDialogProps } from "./AddChapter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useMutation, QueryClient } from "@tanstack/react-query";

const SimpleDialog = (props: SimpleDialogProps) => {
  const queryClient = new QueryClient();
  const { onClose, selectedValue, open } = props;
  const [chapter, setChapter] = useState<string>("");
  const handleClose = () => {
    onClose(selectedValue);
  };
  const postChapter = async () => {
    try {
      const { data } = await axios.post(
        "https://maqasid.azurewebsites.net/api/Chapters",
        { name: chapter },
      );
      return data;
    } catch (error) {
      throw new Error("Error posting data");
    }
  };
  const { mutateAsync: addChapterMutation } = useMutation({
    mutationFn: postChapter,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

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
          onClick={async () => {
            try {
              await addChapterMutation();
            } catch (e) {
              console.error(e);
            }
          }}
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
