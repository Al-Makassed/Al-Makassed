import React, { FC, useState } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TextField from "src/components/Fields/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useGetChapterById from "./hooks/useGetChapterById";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeletePolicyByCode from "./hooks/useDeletePolicy";
import useDeleteAllPolicies from "./hooks/useDeleteAllPolicies";
import { LoadingButton } from "@mui/lab";
import useDeleteChapter from "./hooks/useDeleteChapter";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { openDialog } from "src/features/deleteDialog";
import { useDispatch } from "react-redux";
import { Policy } from "./API/types";
import MaqasidDialog from "src/components/MaqasidDialog";
import { EditChapterDialogProps } from "./types";
import useRenameChapterForm from "./hooks/useRenameChapterForm";
import { Form, FormikProvider } from "formik";

const EditChapterForm: FC<EditChapterDialogProps> = ({
  open,
  onClose,
  chapterId,
}) => {
  const { chapter } = useGetChapterById(chapterId);

  const [deleteType, setDeleteType] = useState<string>("");

  const { deletePolicy } = useDeletePolicyByCode();

  const { deleteAllPolicies } = useDeleteAllPolicies();

  const { formikProps, isRenaming } = useRenameChapterForm(chapterId);

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const { deleteChapter } = useDeleteChapter();

  const handleDeletePolicy = (policy: Policy) => {
    deletePolicy({ chapterId, policyId: policy.id });
  };
  const [policyToDelete, setPolicyToDelete] = useState<Policy>();

  const handleDeleteSetting = (policy: Policy) => {
    setPolicyToDelete(policy);

    handleOpenDialog("Delete Policy");
  };

  const handleDeleteAllPolicies = () => {
    deleteAllPolicies(chapter?.id ?? "");
  };

  const dispatch = useDispatch();

  const handleOpenDialog = (type: string) => {
    setDeleteType(type);
    dispatch(openDialog());
  };

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };
  const handleCloseDialog = () => onClose();

  const handleDeleteChapter = () => deleteChapter(chapterId);

  return (
    <Grid>
      {deleteType === "Delete Chapter" && (
        <ConfirmDeleteDialog
          title={"Delete Chapter"}
          handle={handleDeleteChapter}
        />
      )}
      {deleteType === "Delete All Policies" && (
        <ConfirmDeleteDialog
          title={"Delete All Policies "}
          handle={handleDeleteAllPolicies}
        />
      )}
      {deleteType === "Delete Policy" && policyToDelete && (
        <ConfirmDeleteDialog
          title={"Delete Policy"}
          handle={() => handleDeletePolicy(policyToDelete)}
        />
      )}
      <FormikProvider value={formikProps}>
        <Form>
          <MaqasidDialog
            isOpen={open}
            onClose={handleCloseDialog}
            disableBackdropClick
            disableEscapeKeyDown
            variant="right"
          >
            <MaqasidDialog.Header>
              <MaqasidDialog.Title title="Edit Chapter" />
              <MaqasidDialog.Actions>
                <Chip label="Edit" />

                <MaqasidDialog.Fullscreen />
                <MaqasidDialog.Close />
              </MaqasidDialog.Actions>
            </MaqasidDialog.Header>
            <MaqasidDialog.Body niceScroll>
              <Stack gap={3} padding={6}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", pl: 1 }}
                >
                  <Typography component="h1" variant="h4" fontWeight={600}>
                    Edit Chapter
                  </Typography>

                  <Tooltip title="Delete Chapter">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      size="small"
                      onClick={() => handleOpenDialog("Delete Chapter")}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Stack>

                <TextField label="Chapter Name" name="newChapterName" />

                <LoadingButton
                  loading={isRenaming}
                  disabled={!dirty || !isValid}
                  loadingPosition="start"
                  size="medium"
                  type="submit"
                  variant="contained"
                  aria-label="Forgot"
                  onClick={handleSubmitForm}
                  startIcon={<DriveFileRenameOutlineIcon />}
                >
                  Rename Chapter
                </LoadingButton>

                <Stack sx={{ mt: 1 }} gap={1}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", pl: 1 }}
                  >
                    <Typography variant="h5" fontWeight={500}>
                      Chapter Policies
                    </Typography>

                    <Tooltip title="Delete All">
                      <IconButton
                        color="error"
                        aria-label="Delete All"
                        onClick={() => handleOpenDialog("Delete All Policies")}
                        sx={{ mr: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <List
                    sx={{
                      border: (theme) =>
                        `2px dashed ${theme.palette.grey[500]}`,
                      borderRadius: (theme) => theme.shape.borderRadius,
                      mt: 0,
                    }}
                    disablePadding
                  >
                    {chapter?.policies?.map((policy, index) => (
                      <ListItemButton key={index} sx={{ pl: 4 }}>
                        <ListItemIcon
                          sx={{ color: (theme) => theme.palette.error.main }}
                        >
                          <PictureAsPdfIcon />
                        </ListItemIcon>
                        <ListItemText primary={policy.name} />
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="Delete Policy"
                            onClick={() => handleDeleteSetting(policy)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemButton>
                    ))}
                  </List>
                </Stack>
              </Stack>
            </MaqasidDialog.Body>
          </MaqasidDialog>
        </Form>
      </FormikProvider>
    </Grid>
  );
};

export default EditChapterForm;
