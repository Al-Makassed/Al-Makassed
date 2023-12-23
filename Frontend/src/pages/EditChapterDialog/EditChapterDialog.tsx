import DeleteIcon from "@mui/icons-material/Delete";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
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
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Policy } from "./API/types";
import EditChapterForm from "./components/EditChapterForm";
import { DialogName } from "./constants";
import useDeleteAllPolicies from "./hooks/useDeleteAllPolicies";
import useDeleteChapter from "./hooks/useDeleteChapter";
import useDeletePolicyByCode from "./hooks/useDeletePolicy";
import useGetChapterById from "./hooks/useGetChapterById";

const EditChapterDialog: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  // Open the dialog if the route matches: /chapters/:chapterId
  const { chapterId: chapterIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const { chapter } = useGetChapterById(chapterId);

  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);

  const { deletePolicy } = useDeletePolicyByCode();

  const { deleteAllPolicies } = useDeleteAllPolicies();

  const { deleteChapter } = useDeleteChapter();

  const [policyToDelete, setPolicyToDelete] = useState<Policy>();

  const handleDeleteSetting = (policy: Policy) => {
    setPolicyToDelete(policy);
    openConfirmDeletePolicyDialog();
  };

  const handleDeleteAllPolicies = () => {
    deleteAllPolicies(chapterId);
  };

  const navigateToChapters = () => navigate("/me/policies-and-procedures");

  const closeConfirmDialog = () => setOpenedDialog(null);

  const handleDeleteChapter = () => deleteChapter(chapterId);

  const openConfirmDeleteAllPoliciesDialog = () =>
    setOpenedDialog(DialogName.DeleteAllPolicies);

  const openConfirmDeletePolicyDialog = () =>
    setOpenedDialog(DialogName.DeletePolicy);

  const openConfirmDeleteChapterDialog = () =>
    setOpenedDialog(DialogName.DeleteChapter);

  const closeMainDialog = () => setIsOpen(false);

  const DeleteChapterButton = () => {
    return (
      <Tooltip title="Delete Chapter">
        <IconButton
          aria-label="Delete Policy"
          color="error"
          onClick={openConfirmDeleteChapterDialog}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {!!chapter && (
        <MaqasidDialog
          isOpen={isOpen}
          onClose={closeMainDialog}
          onClosed={navigateToChapters}
          variant="right"
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title={chapter.name} />
            <MaqasidDialog.Actions>
              <DeleteChapterButton />
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body niceScroll>
            <Stack gap={3}>
              <EditChapterForm chapter={chapter!} />

              <Stack sx={{ mt: 1 }} gap={1}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", pl: 1 }}
                >
                  <Typography variant="h5" fontWeight={500}>
                    Chapter Policies
                  </Typography>

                  <Tooltip title="Delete All">
                    <Button
                      variant="text"
                      startIcon={<DeleteIcon />}
                      color="error"
                      aria-label="Delete All"
                      disabled={chapter?.policies?.length === 0}
                      onClick={openConfirmDeleteAllPoliciesDialog}
                      sx={{
                        textTransform: "none",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      Delete All
                    </Button>
                  </Tooltip>
                </Stack>

                <List
                  sx={{
                    border: (theme) => `2px dashed ${theme.palette.grey[500]}`,
                    borderRadius: (theme) => theme.shape.borderRadius,
                    mt: 0,
                  }}
                  disablePadding
                >
                  {chapter?.policies?.map((policy, index) => (
                    <ListItem
                      key={index}
                      sx={{ pl: 3, gap: { xs: 0, sm: 2.5 } }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "fit-content",
                          display: { xs: "none", sm: "inline" },
                        }}
                      >
                        {/* <PictureAsPdfIcon /> */}
                        <AssuredWorkloadIcon />
                      </ListItemIcon>

                      <ListItemText
                        primary={policy.name}
                        sx={{ wordWrap: "break-word", hyphens: "auto" }}
                      />

                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="Delete Policy"
                          size="small"
                          color="error"
                          sx={{ ml: "auto" }}
                          onClick={() => handleDeleteSetting(policy)}
                        >
                          <DeleteIcon sx={{ fontSize: "1.35rem" }} />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Stack>
          </MaqasidDialog.Body>
        </MaqasidDialog>
      )}

      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteChapter}
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
              handleDeleteChapter();
              closeMainDialog();
            },
            color: "error",
          },
        ]}
      />

      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeleteAllPolicies}
        title="Delete All Policies"
        body="Are you sure you want to permanently delete all policies in this chapter?"
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
              handleDeleteAllPolicies();
              closeConfirmDialog();
            },
            color: "error",
          },
        ]}
      />

      <ConfirmDialog
        isOpen={openedDialog === DialogName.DeletePolicy}
        title="Delete Policy"
        body="Are you sure you want to permanently delete this policy?"
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
              deletePolicy({ chapterId, policyId: policyToDelete!.id });
              closeConfirmDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default EditChapterDialog;
