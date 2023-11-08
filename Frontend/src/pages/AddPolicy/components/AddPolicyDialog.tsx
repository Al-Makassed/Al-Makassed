import React, { FC, useState } from "react";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { AddPolicyDialogProps } from "../types";
import AddIcon from "@mui/icons-material/Add";
import useAddPolicyAPI from "../hooks/useAddPolicyAPI";

const AddPolicyDialog: FC<AddPolicyDialogProps> = ({ onClose, open }) => {
  const [policy, setPolicy] = useState<string>("");

  const { addNewPolicy } = useAddPolicyAPI();
  const closeDialog = () => onClose();

  const handleAddPolicy = () => {
    addNewPolicy(policy);
    closeDialog();
  };
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          minWidth: 350,
          maxWidth: 500,
        },
      }}
      aria-labelledby="responsive-dialog-title"
      onClose={closeDialog}
      open={open}
    >
      <DialogTitle
        variant="h5"
        sx={{
          fontWeight: "500",
        }}
      >
        Add Policy
      </DialogTitle>
      <Stack padding="1em" gap={2}>
        <TextField
          id="outlined-basic"
          label="Add Chapter"
          variant="outlined"
          placeholder="e.g. My awesome chapter"
          value={policy}
          onChange={(e) => {
            setPolicy(e.target.value);
          }}
        />
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddPolicy}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddPolicyDialog;
