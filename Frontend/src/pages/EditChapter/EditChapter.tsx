import React from "react";
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useParams } from "react-router-dom";
import useFetchChapter from "./hooks/useGetChaptersById";
import LoaderCell from "src/components/LoaderCell";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import DeleteIcon from '@mui/icons-material/Delete';

const EditChapter = () => {
  const { id } = useParams();
  // console.log(id);
  const { chapter, isFetching } = useFetchChapter(id ?? "");
  // console.log(chapter);
  if (isFetching) return <LoaderCell size={38} color="success" />;

  if (chapter?.id !== id) return null;

  return (
    <Stack spacing={2} padding={3} width={500}>
      <Typography
        variant="h1"
        fontWeight={600}
        fontSize="35px"
        lineHeight="42.36px"
      >
        Edit Chapter
      </Typography>

      <Typography fontSize="20px" fontWeight={400}>
        Chapter Name
      </Typography>
      <TextField
        sx={{ width: "330px" }}
        id="ch_name"
        variant="outlined"
        value={chapter?.name || ""}
      />
      <Stack direction="row" spacing={2}>
        <Typography fontSize="20px" fontWeight={400} padding={2}>
          Policies information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton aria-label="Delete All" sx={{ color: "#d32f2f", mr: 1 }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack spacing={2} border="1px dashed #067B42" borderRadius="12px">
        <List component="div" disablePadding>
          {chapter?.policies.map((policy, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: "#d32f2f", mr: -2.5 }}>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary={policy.name} />
              <Tooltip title="Delete Policy">
                <IconButton aria-label="Delete Policy" sx={{ mr: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </Stack>

      <Button
        size="medium"
        // color="success"
        type="submit"
        variant="contained"
        sx={{ width: "250px", mb: 1.5 }}
        aria-label="Forgot"
        //  onClick={handleSubmitForm}
        endIcon={<CheckCircleOutlineIcon />}
      >
        Save Change
      </Button>
    </Stack>
  );
};

export default EditChapter;
