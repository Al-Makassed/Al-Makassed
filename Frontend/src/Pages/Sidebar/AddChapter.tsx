import * as React from "react";
import { green } from "@mui/material/colors";
import SimpleDialog from "./SimpleDialog";
import { IconButton, Stack, Typography } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="3em"
      color={green[900]}
    >
      <IconButton>
        <AddCircleOutlineIcon
          color="success"
          onClick={handleClickOpen}
          fontSize="large"
        />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <Typography variant="h6" paddingTop="1em" color="black">
        {" "}
        Add Chapter{" "}
      </Typography>
    </Stack>
  );
}
