import * as React from "react";
import AddChapterDialog from "./Sidebar/components/AddChapterDialog";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const AddChapterButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        sx={{ maxWidth: "350px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add Chapter
      </Button>
      <AddChapterDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default AddChapterButton;
