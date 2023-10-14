import * as React from "react";
import SimpleDialog from "./SimpleDialog";
import { IconButton, Stack, Typography } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// const emails = ["username@gmail.com", "user02@gmail.com"];

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
    <Stack
      sx={{
        bgcolor: (theme) => theme.palette.maqasid.secondary,
        position: "fixed",
        bottom: 0,
        left: 0,
        borderTop: "1px solid gray",
        // width:"38.5%",
        // height:"2em"
      }}
      // border="1px dashed black"
      width="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingBottom={1}
      paddingTop={1}
      // padding="1em"
    >
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px dashed grey "
        width="130px"
        height={1}
        borderRadius="12px"
        // paddingTop={2}
      >
        <IconButton>
          <AddCircleOutlineIcon
            sx={{ color: (theme) => theme.palette.maqasid.primary }}
            onClick={handleClickOpen}
            fontSize="large"
          />
        </IconButton>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <Typography
          variant="subtitle1"
          // paddingTop="1em"
          color="black"
          paddingBottom="1em"
          fontWeight={700}
          fontSize="1rem"
        >
          {" "}
          Add Chapter{" "}
        </Typography>
      </Stack>
    </Stack>
  );
}
