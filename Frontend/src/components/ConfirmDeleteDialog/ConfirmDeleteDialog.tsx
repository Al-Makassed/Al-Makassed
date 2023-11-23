import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import { closeDialog, selectIsDialogOpen } from "src/features/deleteDialog";
import { useAppSelector } from "src/store/hooks";
import { ConfirmDeleteDialogProps } from "../../pages/EditChapterForm/components/types";
import { useDispatch } from "react-redux";

const ConfirmDeleteDialog = ({ title, handle }: ConfirmDeleteDialogProps) => {
  const isOpenDialog = useAppSelector(selectIsDialogOpen);
  const dispatch = useDispatch();

  const handleCloseDialog = () => dispatch(closeDialog());
  const handleAction = () => {
    handle();
    handleCloseDialog();
  };

  return (
    <MaqasidDialog
      isOpen={isOpenDialog}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title={title} />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body niceScroll>
        <Stack gap={1}>
          <Typography>
            Are You Sure you want to Permanently delete this ?
          </Typography>
        </Stack>
      </MaqasidDialog.Body>
      <MaqasidDialog.Footer>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="error" onClick={handleAction}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            No
          </Button>
        </Stack>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default ConfirmDeleteDialog;
