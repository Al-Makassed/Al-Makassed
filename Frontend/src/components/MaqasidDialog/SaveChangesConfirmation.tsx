import React, { FC, MouseEvent, useEffect, ReactNode } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button, { ButtonProps } from "@mui/material/Button";
import useDialogContext from "./context/useDialog";

interface DialogAction {
  label: string;
  onClick: ButtonProps["onClick"];
}

interface SaveChangesConfirmationProps {
  isDirty: boolean;
  cancelProps?: Partial<DialogAction>;
  closeAndDiscardProps?: Partial<DialogAction>;
  saveAndCloseProps?: Partial<DialogAction>;
  title?: string;
  body?: ReactNode;
  fullWidth?: DialogProps["fullWidth"];
  maxWidth?: DialogProps["maxWidth"];
}

const SaveChangesConfirmation: FC<SaveChangesConfirmationProps> = ({
  isDirty = false,
  cancelProps,
  closeAndDiscardProps,
  saveAndCloseProps,
  title = "Save Changes",
  body = (
    <DialogContentText>
      Are you sure you want to close without saving?
    </DialogContentText>
  ),
  maxWidth,
}) => {
  const {
    saveChangesConfirmationDialog: { isOpen, onClose, onSetDirty },
  } = useDialogContext();

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    onClose();
    cancelProps?.onClick?.(e);
  };

  const handleCloseAndDiscard = (e: MouseEvent<HTMLButtonElement>) => {
    onClose();
    closeAndDiscardProps?.onClick?.(e);
  };

  const handleSaveAndClose = (e: MouseEvent<HTMLButtonElement>) => {
    onClose();
    saveAndCloseProps?.onClick?.(e);
  };

  useEffect(() => {
    onSetDirty(isDirty);
  }, [isDirty]);

  return (
    <Dialog
      open={isOpen}
      maxWidth={maxWidth}
      aria-labelledby="save-changes"
      aria-describedby="save-changes-confirmation-dialog"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelProps?.label ?? "Cancel"}</Button>
        <Button onClick={handleSaveAndClose} autoFocus>
          {saveAndCloseProps?.label ?? "Yes, Save"}
        </Button>
        <Button onClick={handleCloseAndDiscard} autoFocus>
          {closeAndDiscardProps?.label ?? "No, Discard"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveChangesConfirmation;
