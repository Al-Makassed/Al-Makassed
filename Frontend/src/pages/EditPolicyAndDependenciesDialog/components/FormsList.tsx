import React, { FC, useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dependency } from "../API/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { DialogName, PolicyDependencyType } from "../constants";
import ConfirmDialog from "src/components/ConfirmDialog";

const FormsList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const id = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";
  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);

  const openConfirmDeleteAllFormsDialog = () =>
    setOpenedDialog(DialogName.DeleteForms);

  const { policy } = useGetPolicy({ chapterId: id, policyId });

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId: id, policyId, type: 0 });
  };
  const { deleteDependency } = useDeleteDependency();

  const handleDeleteDependency = (dependencyId: string) => () => {
    deleteDependency({ chapterId: id, policyId, dependencyId });
  };
  const closeConfirmDialog = () => setOpenedDialog(null);

  const policyForms =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Form,
    ) ?? [];

  return (
    <Stack gap={3}>
      <Typography variant="subtitle1" fontWeight={500}>
        Forms information
      </Typography>
      <Tooltip title="Delete All">
        <Button
          size="small"
          variant="outlined"
          color="error"
          aria-label="Delete All"
          onClick={openConfirmDeleteAllFormsDialog}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Tooltip>
      <List
        sx={{
          border: (theme) => `2px dashed ${theme.palette.grey[500]}`,
          borderRadius: (theme) => theme.shape.borderRadius,
          mt: 0,
        }}
        disablePadding
      >
        {policyForms.map((policyForm: Dependency, index) => (
          <ListItem sx={{ pl: 4 }} key={index}>
            <ListItemIcon sx={{ color: (theme) => theme.palette.error.main }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary={policyForm.name} sx={{ ml: -2 }} />

            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Policy"
                onClick={handleDeleteDependency(policyForm.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteForms}
        title="Delete Chapter"
        body="Are you sure you want to permanently delete this chapter?"
        onClose={closeConfirmDialog}
        actions={[
          {
            text: "Cancel",
            onClick: closeConfirmDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              closeConfirmDialog();
              handleDeleteAllDependencies();
            },
            color: "error",
          },
        ]}
      />
    </Stack>
  );
};

export default FormsList;
