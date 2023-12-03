import React, { FC } from "react";
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
import { Dependency } from "../API/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { PolicyDependencyType } from "../constants";

const ProtocolsList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const id = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy } = useGetPolicy({ chapterId: id, policyId });

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId: id, policyId, type: 2 });
  };
  const { deleteDependency } = useDeleteDependency();

  const handleDeleteDependency = (dependencyId: string) => () => {
    deleteDependency({ chapterId: id, policyId, dependencyId });
  };

  const policyProtocols =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Protocol,
    ) ?? [];

  return (
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
          onClick={handleDeleteAllDependencies}
          startIcon={<DeleteIcon />}
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
              <IconButton onClick={handleDeleteDependency(policyProtocols.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default ProtocolsList;
