import * as React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Stack
        sx={{
          // bgcolor: (theme) => theme.palette.maqasid.secondary,
          // bgcolor: green[50],
          position: "fixed",
          bottom: 0,
          left: 0,
          borderTop: "1px solid gray",
          justifyContent: "center",
          py: 1,
          px: 2,

          bgcolor: "rgba(255, 255, 255, 0.24)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
        }}
        width="inherit"
        display="flex"
        alignItems="center"
        direction="row"
      >
        <Button
          color="success"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Chapter
        </Button>
      </Stack>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
