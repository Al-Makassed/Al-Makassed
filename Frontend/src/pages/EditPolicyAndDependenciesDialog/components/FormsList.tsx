import { FC, useState } from "react";
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
import { Dependency } from "src/API/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { DialogName, PolicyDependencyType } from "../constants";
import ConfirmDialog from "src/components/ConfirmDialog";
import EmptyDependency from "./EmptyDependency";

const FormsList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);

  const openConfirmDeleteAllFormsDialog = () =>
    setOpenedDialog(DialogName.DeleteForms);

  const openConfirmDeleteFormDialog = () =>
    setOpenedDialog(DialogName.DeleteForm);

  const [policyFormToDelete, setPolicyFormToDelete] = useState<Dependency>();

  const handleDeleteSetting = (policyFormToDelete: Dependency) => {
    setPolicyFormToDelete(policyFormToDelete);
    openConfirmDeleteFormDialog();
  };

  const { policy } = useGetPolicy({ chapterId, policyId });

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId, policyId, type: 0 });
  };

  const { deleteDependency } = useDeleteDependency();

  const closeConfirmDialog = () => setOpenedDialog(null);

  const policyForms =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Form,
    ) ?? [];

  return (
    <>
      <Stack gap={3}>
        <Stack direction={"row"}>
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
              disabled={policyForms?.length === 0}
              sx={{ ml: "auto", textTransform: "none" }}
            >
              Delete All
            </Button>
          </Tooltip>
        </Stack>

        {policyForms.length === 0 && <EmptyDependency type="form" />}

        {policyForms.length > 0 && (
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
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.error.main }}
                >
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary={policyForm.name} sx={{ ml: -2 }} />

                <Tooltip title="Delete">
                  <IconButton
                    aria-label="Delete Policy"
                    onClick={() => handleDeleteSetting(policyForm)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        )}
      </Stack>

      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteForms}
        title="Delete All Forms"
        body="Are you sure you want to permanently delete all forms in this policy ?"
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

      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteForm}
        title="Delete Form"
        body="Are you sure you want to permanently delete this form ?"
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
              deleteDependency({
                chapterId,
                policyId,
                dependencyId: policyFormToDelete!.id,
              });
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default FormsList;
