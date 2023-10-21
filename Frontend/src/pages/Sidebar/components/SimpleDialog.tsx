import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { SimpleDialogProps } from "./AddChapter";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddIcon from "@mui/icons-material/Add";

const SimpleDialog = (props: SimpleDialogProps) => {
  const queryClient = useQueryClient();
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
  const { mutate: addChapterMutation } = useMutation({
    mutationFn: postChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chapters"],
      });
      console.log("Test");
    },
  });

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          minWidth: 600,
        },
      }}
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
      open={open}
    >
      {/* <Stack
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1em"

        // sx={{ color: (theme) => theme.palette.maqasid.primary }}
      > */}
      {/* <AddCircleIcon fontSize="large" /> */}
      <DialogTitle
        variant="h5"
        sx={{
          // color: (theme) => theme.palette.maqasid.primary,
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
          // color="success"
          value={chapter}
          onChange={(e) => {
            setChapter(e.target.value);
          }}
        />
        {/* </Stack> */}
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={async () => {
              try {
                await addChapterMutation();
              } catch (e) {
                console.error(e);
              }
            }}
            // sx={{
            //   background: (theme) => theme.palette.maqasid.primary,
            //   "&:hover": {
            //     backgroundColor: "ButtonShadow",
            //   },
            // }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default SimpleDialog;
