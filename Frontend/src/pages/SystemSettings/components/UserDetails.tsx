import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "../API/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ConfirmDialog from "src/components/ConfirmDialog";
import { grey } from "@mui/material/colors";
// import AddUserDialog from "./AddUserDialog";
import useGetUsers from "../hooks/useGetUsers";
import useDeleteUser from "../hooks/useDeleteUser";
// import AddUserDialog from "./AddUserDialog";
import EditUserRoleDialog from "./EditUserRoleDialog";
import EditUserDepartmentDialog from "./EditUserDepartmentDialog";
// import EditUserDialog from "./EditUserDialog";

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

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Name", width: 250 },
    // { field: "userName", headerName: "userName", width: 450 },
    { field: "roles", headerName: "Role", width: 200 },
    { field: "departmentId", headerName: "Department", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit userRole">
            <IconButton
              onClick={() => handleEditButtonClick(params.row)}
              aria-label="Edit userRole"
              sx={{ mr: 0.5 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete user">
            <IconButton
              aria-label="Delete user"
              sx={{ mr: 0.5 }}
              color="error"
              onClick={() => handleDeleteButtonClicked(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit userDepartment">
            <IconButton
              onClick={() => handleEditButtonClick(params.row)}
              aria-label="Edit userDepartment"
              sx={{ mr: 0.5 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
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
