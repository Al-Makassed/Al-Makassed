import React, { FC } from "react";
import {
  Box,
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
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependencyByCode from "../hooks/useDeleteDependencyByCode";

const FormsList: FC = () => {
  const { code: codeParam } = useParams();

  const code = codeParam ?? "";

  const { policy } = useGetPolicyByCode(code);

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ type: 0, code });
  };
  const { deleteDependency } = useDeleteDependencyByCode();

  const handleDeleteDependency = () => {
    deleteDependency(code);
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
          Forms information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton
            color="error"
            aria-label="Delete All"
            onClick={handleDeleteAllDependencies}
            sx={{ mr: 2 }}
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
            {dependency.policyDependencyType === 0 && (
              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "palette.error.dark" }}>
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

export default FormsList;
