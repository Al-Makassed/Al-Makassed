import {
  Stack,
  Box,
  Typography,
  Tooltip,
  IconButton,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Dependency } from "../API/types";
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependencyByCode from "../hooks/useDeleteDependencyByCode";

const EditPoster = () => {
  const { code } = useParams();
  const {
    policy,
    // isFetching
  } = useGetPolicyByCode(code ?? "");
  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ type: 1, code: code || "" });
  };
  const { deleteDependency } = useDeleteDependencyByCode();

  const handleDeleteDependency = () => {
    deleteDependency(code || "");
  };
  if (!policy) return <Typography variant="h1">Invalid Policy Code</Typography>;

  return (
    <Stack>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ justifyContent: "space-between", mt: 2, pl: 1 }}
      >
        <Typography variant="subtitle1" fontWeight={500}>
          Posters information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton
            color="error"
            aria-label="Delete All"
            sx={{ mr: 2 }}
            onClick={handleDeleteAllDependencies}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List
        sx={{
          border: (theme) => `1px dashed ${theme.palette.success.main}`,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
        disablePadding
      >
        {policy.dependencies.map((dependency: Dependency, index) => (
          <React.Fragment key={index}>
            {dependency.policyDependencyType === 1 && (
              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "#d32f2f" }}>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary={dependency.name} sx={{ ml: -2 }} />

                <Tooltip title="Delete">
                  <IconButton
                    aria-label="Delete Policy"
                    onClick={handleDeleteDependency}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default EditPoster;
