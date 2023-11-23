import React, { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useParams } from "react-router-dom";
import useGetChapterById from "./hooks/useGetChapterById";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeletePolicyByCode from "./hooks/useDeletePolicy";
import useDeleteAllPolicies from "./hooks/useDeleteAllPolicies";
import useRenameChapter from "./hooks/useRenameChapter";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import EditChapterFormSkeleton from "./components/EditChapterFormSkeleton";
import useDeleteChapter from "./hooks/useDeleteChapter";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { openDialog } from "src/features/deleteDialog";
import { useDispatch } from "react-redux";
import { Policy } from "./API/types";

const EditChapterForm: FC = () => {
  const { chapterId: chapterIdParam } = useParams();

  const id = chapterIdParam ?? "";

  const { chapter, isFetching } = useGetChapterById(id);

  const theme = useTheme();
  const [deleteType, setDeleteType] = useState<string>("");

  const { deletePolicy } = useDeletePolicyByCode();

  const { deleteAllPolicies } = useDeleteAllPolicies();

  const { renameChapter, isRenaming } = useRenameChapter();

  const { deleteChapter } = useDeleteChapter();

  const [chapterName, setChapterName] = useState<string>(chapter?.name ?? "");

  const handleDeletePolicy = (policy: Policy) => {
    deletePolicy({ chapterId: id, policyId: policy.id });
  };
  const [policyToDelete, setPolicyToDelete] = useState<Policy>();

  const handleDeleteSetting = (policy: Policy) => {
    setPolicyToDelete(policy);

    handleOpenDialog("Delete Policy");
  };

  const handleDeleteAllPolicies = () => {
    deleteAllPolicies(chapter?.id ?? "");
  };

  const handleChangeChapterName = (event: ChangeEvent<HTMLInputElement>) => {
    setChapterName(event.target.value);
  };

  const handleSubmitChanges = () => {
    renameChapter({
      newChapterName: chapterName,
      id: chapter?.id ?? "",
    });
  };

  const dispatch = useDispatch();

  const handleOpenDialog = (type: string) => {
    setDeleteType(type);
    dispatch(openDialog());
  };

  const handleDeleteChapter = () => deleteChapter(id);
  if (isFetching) return <EditChapterFormSkeleton />;

  return (
    <Grid
      container
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        overflow: "auto",
        ...theme.mixins.niceScroll(),
      }}
    >
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

      <Stack gap={3} padding={6} width={500}>
        <Stack direction="row" sx={{ justifyContent: "space-between", pl: 1 }}>
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

        <TextField
          label="Chapter Name"
          variant="outlined"
          value={chapterName}
          onChange={handleChangeChapterName}
        />

        <LoadingButton
          loading={isRenaming}
          loadingPosition="start"
          size="medium"
          type="submit"
          variant="contained"
          aria-label="Forgot"
          onClick={handleSubmitChanges}
          startIcon={<DriveFileRenameOutlineIcon />}
          disabled={chapterName === ""}
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
              border: (theme) => `2px dashed ${theme.palette.grey[500]}`,
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
    </Grid>
  );
};

export default EditChapterForm;
