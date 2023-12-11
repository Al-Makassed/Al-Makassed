import {
  ListItemButton,
  Typography,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DepartmentListItemProps } from "../types";
import React, { FC, useState } from "react";
import EditDepartmentDialog from "./EditDepartmentDialog";

const DepartmentListItem: FC<DepartmentListItemProps> = ({ department }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  return (
    <Stack direction="row" gap={3}>
      <ListItemButton>
        <Typography
          fontWeight={600}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          {department.name}
        </Typography>
      </ListItemButton>
      <Stack direction="row">
        <Tooltip title="Edit department">
          <IconButton
            onClick={handleOpenDialog}
            aria-label="Edit department"
            sx={{ mr: 0.5 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <EditDepartmentDialog open={isDialogOpen} onClose={handleCloseDialog} />
        <Tooltip title="Delete department">
          <IconButton
            aria-label="Delete department"
            sx={{ mr: 0.5 }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default DepartmentListItem;
