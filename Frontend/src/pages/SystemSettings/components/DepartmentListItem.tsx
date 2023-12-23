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
import useDeleteDepartment from "../hooks/useDeleteDepartment";
import ConfirmDialog from "src/components/ConfirmDialog";

const DepartmentListItem: FC<DepartmentListItemProps> = ({ department }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const { removeDepartment } = useDeleteDepartment();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleDeleteButtonClicked = () => setIsConfirmDialogOpen(true);

  return (
    <>
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
          <EditDepartmentDialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            department={department}
          />
          <Tooltip title="Delete department">
            <IconButton
              aria-label="Delete department"
              sx={{ mr: 0.5 }}
              color="error"
              onClick={handleDeleteButtonClicked}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove Department"
        body="Are you sure you want to permanently remove department?"
        onClose={closeConfirmDialog}
        actions={[
          {
            text: "Cancel",
            onClick: closeConfirmDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              closeConfirmDialog();
              removeDepartment(department.id);
              handleCloseDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default DepartmentListItem;
