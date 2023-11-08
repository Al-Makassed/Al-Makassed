import React, { ChangeEvent, useState } from "react";
import {
  Button,
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
import useFetchChapter from "./hooks/useGetChaptersById";
import LoaderCell from "src/components/LoaderCell";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeletePolicyByCode from "./hooks/useDeletePolicyByCode";
import useDeleteAllPolicies from "./hooks/useDeleteAllPolicies";
import useRenameChapter from "./hooks/useRenameChapter";

const EditChapter = () => {
  const { id } = useParams();
  const { chapter, isFetching } = useFetchChapter(id ?? "");
  const [newChapter, setNewChapter] = useState<string>(chapter?.name ?? "");
  const { deletePolicy } = useDeletePolicyByCode();
  const { deleteAllPolicies } = useDeleteAllPolicies();
  const { renameChapter } = useRenameChapter();
  const handleDeleteAllPolicy = () => {
    if (chapter?.id) {
      deleteAllPolicies(chapter.id);
    } else return null;
  };

  const handleChangeChapterName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewChapter(event.target.value);
  };
  const handleSubmitChanges = () => {
    if (chapter?.id) {
      renameChapter({
        newChapterName: newChapter,
        id: chapter.id,
      });
    } else return null;
  };
  if (isFetching) return <LoaderCell size={38} color="success" />;

  if (chapter?.id !== id) return null;

  return (
    <Stack spacing={3} padding={6} width={500}>
      <Typography
        variant="h1"
        fontWeight={600}
        fontSize="35px"
        lineHeight="42.36px"
      >
        Edit Chapter
      </Typography>

      <TextField
        color="success"
        label="Chapter Name"
        sx={{ width: "330px" }}
        id="ch_name"
        variant="outlined"
        value={newChapter}
        onChange={handleChangeChapterName}
      />
      <Button
        size="medium"
        color="success"
        type="submit"
        variant="contained"
        sx={{ width: "250px" }}
        aria-label="Forgot"
        onClick={handleSubmitChanges}
        endIcon={<DriveFileRenameOutlineIcon />}
      >
        Rename Chapter
      </Button>
      <Stack direction="row" spacing={2}>
        <Typography fontSize="20px" fontWeight={400} padding={2}>
          Policies information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton
            aria-label="Delete All"
            sx={{ color: "#d32f2f", mr: 1 }}
            onClick={handleDeleteAllPolicy}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack spacing={2} border="1px dashed #067B42" borderRadius="12px">
        <List component="div" disablePadding>
          {chapter?.policies.map((policy, index) => (
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
    </Stack>
  );
};

export default EditChapter;
