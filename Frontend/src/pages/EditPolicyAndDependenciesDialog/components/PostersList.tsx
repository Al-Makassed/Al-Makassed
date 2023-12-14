import {
  Stack,
  Typography,
  Tooltip,
  IconButton,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Dependency } from "src/API/types";
import useGetPolicy from "../hooks/useGetPolicy";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { DialogName, PolicyDependencyType } from "../constants";
import ConfirmDialog from "src/components/ConfirmDialog";

const PostersList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);

  const [policyPosterToDelete, setPolicyPosterToDelete] =
    useState<Dependency>();

  const handleDeleteSetting = (policyPosterToDelete: Dependency) => {
    setPolicyPosterToDelete(policyPosterToDelete);
    openConfirmDeletePosterDialog();
  };

  const openConfirmDeletePosterDialog = () =>
    setOpenedDialog(DialogName.DeletePoster);

  const openConfirmDeleteAllPostersDialog = () =>
    setOpenedDialog(DialogName.DeleteForms);

  const { policy } = useGetPolicy({ chapterId, policyId });
  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId, policyId, type: 1 });
  };
  const { deleteDependency } = useDeleteDependency();

  const closeConfirmDialog = () => setOpenedDialog(null);

  const policyPosters =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Poster,
    ) ?? [];

  return (
    <>
      <Stack gap={3}>
        <Typography variant="subtitle1" fontWeight={500}>
          Posters information
        </Typography>
        <Tooltip title="Delete All">
          <Button
            size="small"
            variant="outlined"
            color="error"
            aria-label="Delete All"
            onClick={openConfirmDeleteAllPostersDialog}
            startIcon={<DeleteIcon />}
            disabled={policyPosters?.length === 0}
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
          {policyPosters.map((policyPoster: Dependency, index) => (
            <ListItem sx={{ pl: 4 }} key={index}>
              <ListItemIcon sx={{ color: (theme) => theme.palette.error.main }}>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary={policyPoster.name} sx={{ ml: -2 }} />

              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete Poster"
                  onClick={() => handleDeleteSetting(policyPoster)}
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
        title="Delete All Posters"
        body="Are you sure you want to permanently delete all posters in this policy ?"
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
        title="Delete Poster"
        body="Are you sure you want to permanently delete this poster ?"
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
                dependencyId: policyPosterToDelete!.id,
              });
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default PostersList;
