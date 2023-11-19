import React, { ChangeEvent, FC, useState } from "react";
import {
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
import useFetchChapter from "./hooks/useGetChapterById";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeletePolicyByCode from "./hooks/useDeletePolicyByCode";
import useDeleteAllPolicies from "./hooks/useDeleteAllPolicies";
import useRenameChapter from "./hooks/useRenameChapter";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import EditChapterFormSkeleton from "./components/EditChapterFormSkeleton";

const EditChapterForm: FC = () => {
  const { id } = useParams();

  const { chapter, isFetching } = useFetchChapter(id ?? "");

  const theme = useTheme();

  const { deletePolicy } = useDeletePolicyByCode();

  const { deleteAllPolicies } = useDeleteAllPolicies();

  const { renameChapter, isRenaming } = useRenameChapter();

  if (!chapter) return <Typography variant="h1">Invalid chapter id</Typography>;

  const [chapterName, setChapterName] = useState<string>(chapter?.name ?? "");

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
      <Stack spacing={3} padding={6} width={500}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          Edit Chapter
        </Typography>

        <TextField
          color="success"
          label="Chapter Name"
          variant="outlined"
          value={chapterName}
          onChange={handleChangeChapterName}
        />
        <LoadingButton
          loading={isRenaming}
          loadingPosition="start"
          size="medium"
          color="success"
          type="submit"
          variant="contained"
          aria-label="Forgot"
          onClick={handleSubmitChanges}
          endIcon={<DriveFileRenameOutlineIcon />}
          disabled={chapterName === ""}
        >
          Rename Chapter
        </LoadingButton>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", mt: 2, pl: 1 }}
        >
          <Typography variant="h5" fontWeight={500}>
            Chapter Policies
          </Typography>

          <Tooltip title="Delete All">
            <IconButton
              color="error"
              aria-label="Delete All"
              onClick={handleDeleteAllPolicies}
              sx={{ mr: 2 }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <List
          sx={{
            border: (theme) => `1px dashed ${theme.palette.success.main}`,
            borderRadius: (theme) => theme.shape.borderRadius,
          }}
          disablePadding
        >
          {chapter?.policies?.map((policy, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: "#d32f2f" }}>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary={policy.name} />
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete Policy"
                  onClick={() => deletePolicy(policy.code)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Grid>
  );
};

export default EditChapterForm;
