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
import { Dependency } from "src/API/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { DialogName, PolicyDependencyType } from "../constants";
import ConfirmDialog from "src/components/ConfirmDialog";

const ProtocolsList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);

  const [policyProtocolToDelete, setPolicyPosterToDelete] =
    useState<Dependency>();

  const handleDeleteSetting = (policyProtocolToDelete: Dependency) => {
    setPolicyPosterToDelete(policyProtocolToDelete);
    openConfirmDeleteProtocolDialog();
  };

  const openConfirmDeleteProtocolDialog = () =>
    setOpenedDialog(DialogName.DeletePoster);

  const openConfirmDeleteAllProtocolsDialog = () =>
    setOpenedDialog(DialogName.DeleteForms);

  const { policy } = useGetPolicy({ chapterId, policyId });

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId, policyId, type: 2 });
  };
  const { deleteDependency } = useDeleteDependency();

  const closeConfirmDialog = () => setOpenedDialog(null);

  const policyProtocols =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Protocol,
    ) ?? [];

  return (
    <>
      {" "}
      <Stack gap={3}>
        <Typography variant="subtitle1" fontWeight={500}>
          Protocols information
        </Typography>
        <Tooltip title="Delete All">
          <Button
            size="small"
            variant="outlined"
            color="error"
            aria-label="Delete All"
            onClick={openConfirmDeleteAllProtocolsDialog}
            startIcon={<DeleteIcon />}
            disabled={policyProtocols?.length === 0}
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
          {policyProtocols.map((policyProtocols: Dependency, index) => (
            <ListItem sx={{ pl: 4 }} key={index}>
              <ListItemIcon sx={{ color: (theme) => theme.palette.error.main }}>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary={policyProtocols.name} sx={{ ml: -2 }} />

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDeleteSetting(policyProtocols)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Stack>
      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteForms}
        title="Delete All Protocols"
        body="Are you sure you want to permanently delete all protocols in this policy ?"
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
        isOpen={openedDialog === DialogName.DeletePoster}
        title="Delete Protocol"
        body="Are you sure you want to permanently delete this protocol ?"
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
                dependencyId: policyProtocolToDelete!.id,
              });
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default ProtocolsList;
