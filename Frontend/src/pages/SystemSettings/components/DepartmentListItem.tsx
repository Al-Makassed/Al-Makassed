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
import React, { FC } from "react";

const DepartmentListItem: FC<DepartmentListItemProps> = ({ department }) => {
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
          <IconButton aria-label="Edit department" sx={{ mr: 0.5 }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit department">
          <IconButton
            aria-label="Edit department"
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
