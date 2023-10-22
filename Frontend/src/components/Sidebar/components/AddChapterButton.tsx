import * as React from "react";
import AddChapterDialog from "./AddChapterDialog";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddChapterButton = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Stack
        sx={{
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
          onClick={handleOpenDialog}
        >
          Add Chapter
        </Button>
      </Stack>
      <AddChapterDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default AddChapterButton;
