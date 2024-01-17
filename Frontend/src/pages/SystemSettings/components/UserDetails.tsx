import {
  Button,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { User } from "../API/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ConfirmDialog from "src/components/ConfirmDialog";
import { grey } from "@mui/material/colors";
import useGetUsers from "../hooks/useGetUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import EditUserRoleDialog from "./EditUserRoleDialog";
import EditUserDepartmentDialog from "./EditUserDepartmentDialog";

const UserDetails: FC = () => {
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const { users } = useGetUsers();

  console.log(users);

  const { removeUser } = useDeleteUser();

  const handleCloseConfirmDialog = () => setIsConfirmDialogOpen(false);

  //   const handleOpenAddDialog = () => setIsDialogOpen(true);

  //   const handleCloseDialog = () => setIsDialogOpen(false);

  const handleOpenEditDialog = () => setIsEditDialogOpen(true);

  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const handleDeleteButtonClicked = (user: User) => {
    setSelectedUser(user);
    setIsConfirmDialogOpen(true);
  };

  const handleEditButtonClick = (role: User) => {
    setSelectedUser(role);
    handleOpenEditDialog();
  };

  const actions = [
    { name: "Edit User Department", icon: <EditIcon /> },
    { name: "Edit User Role", icon: <EditNoteIcon /> },
  ];

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Name", width: 175 },
    { field: "createdOn", headerName: "Member Since", width: 270 },
    { field: "roles", headerName: "Role", width: 110 },
    {
      field: "department",
      headerName: "Department",
      width: 220,
      renderCell: (params) => <span>{params.row.department.name}</span>,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <>
          <Tooltip title="Delete user">
            <IconButton
              aria-label="Delete user"
              sx={{ mr: 0.5 }}
              color="error"
              onClick={() => handleDeleteButtonClicked(params.row)}
              // size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{
              "& .MuiFab-root": {
                height: "36px",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1.3rem",
              },
              width: "160px",
            }}
            direction="right"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleEditButtonClick(params.row)}
              />
            ))}
          </SpeedDial>
        </>
      ),
    },
  ];

  return (
    <>
      <Stack gap={1.5} width="73%" pt={3} sx={{ ml: { xs: 2, md: 0 } }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          //   onClick={handleOpenAddDialog}
          sx={{ width: "fit-content" }}
        >
          User
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All Users
        </Typography>

        <Stack sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{ width: { xs: 320, md: 650, lg: 1000 }, bgcolor: grey[100] }}
          />
        </Stack>
      </Stack>

      {/* <AddUserDialog open={isDialogOpen} onClose={handleCloseDialog} /> */}

      <EditUserRoleDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        userRole={selectedUser!}
      />

      <EditUserDepartmentDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        userDepartment={selectedUser!}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove User"
        body="Are you sure you want to permanently remove this User?"
        onClose={handleCloseConfirmDialog}
        actions={[
          {
            text: "Cancel",
            onClick: handleCloseConfirmDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              handleCloseConfirmDialog();
              removeUser(selectedUser!.id);
              //   handleCloseDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default UserDetails;
