import AddIcon from "@mui/icons-material/Add";
import RoleIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState } from "react";
import ConfirmDialog from "src/components/ConfirmDialog";
import SignUpDialog from "src/pages/SignUpDialog";
import { formatDate } from "src/utils";
import { User } from "../API/type";
import { UserDialogType } from "../constants";
import useDeleteUser from "../hooks/useDeleteUser";
import useGetUsers from "../hooks/useGetUsers";
import EditUserDepartmentDialog from "./EditUserDepartmentDialog";
import EditUserRoleDialog from "./EditUserRoleDialog";

const UserDetails: FC = () => {
  const [dialogType, setDialogType] = useState<UserDialogType | null>(null);

  const [selectedUser, setSelectedUser] = useState<User>();

  const { users } = useGetUsers();

  const { removeUser } = useDeleteUser();

  const theme = useTheme<Theme>();

  const handleCloseDialog = () => setDialogType(null);

  const handleAddButtonDialog = () => setDialogType(UserDialogType.ADD);

  const handleDeleteButtonClicked = (user: User) => {
    setSelectedUser(user);
    setDialogType(UserDialogType.DELETE);
  };

  const handleEditDepartmentButtonClick = (role: User) => {
    setSelectedUser(role);
    setDialogType(UserDialogType.EDIT_DEPARTMENT);
  };

  const handleEditRoleButtonClick = (role: User) => {
    setSelectedUser(role);
    setDialogType(UserDialogType.EDIT_ROLE);
  };

  const actions = [
    {
      name: "Edit User Department",
      icon: <BusinessIcon />,
      onclick: handleEditDepartmentButtonClick,
    },
    {
      name: "Edit User Role",
      icon: <RoleIcon />,
      onclick: handleEditRoleButtonClick,
    },
  ];

  const columns: GridColDef[] = [
    { field: "userName", headerName: "User Name", width: 180 },
    { field: "fullName", headerName: "Full Name", width: 180 },
    {
      field: "createdOn",
      headerName: "Member Since",
      width: 220,
      valueFormatter: (params) => formatDate(params.value),
    },
    { field: "roles", headerName: "Role", width: 110 },
    {
      field: "department",
      headerName: "Department",
      width: 170,
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
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{
              "& .css-14ruj5o-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab":
                {
                  minHeight: "0px",
                },
              "& .MuiFab-root": {
                height: "30px",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
              width: "155px",
            }}
            direction="right"
            icon={<EditIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onclick.bind(null, params.row)}
              />
            ))}
          </SpeedDial>
        </>
      ),
    },
  ];

  return (
    <>
      <Stack
        gap={1.5}
        width="100%"
        maxWidth={"calc(100vw - 300px - 24px)"}
        py={3}
        pl={{ xs: 2, sm: 0 }}
        pr={{ xs: 2, sm: 3 }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddButtonDialog}
          sx={{ width: "fit-content" }}
        >
          User
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All Users
        </Typography>

        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - 48px - 36.5px - 32px - 24px - 10px - ${theme.mixins.toolbar.height}px)`,
          }}
        >
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
          />
        </Grid>
      </Stack>

      <SignUpDialog
        open={dialogType === UserDialogType.ADD}
        onClose={handleCloseDialog}
      />

      <EditUserRoleDialog
        open={dialogType === UserDialogType.EDIT_ROLE}
        onClose={handleCloseDialog}
        user={selectedUser!}
      />

      <EditUserDepartmentDialog
        open={dialogType === UserDialogType.EDIT_DEPARTMENT}
        onClose={handleCloseDialog}
        userDepartment={selectedUser!}
      />

      <ConfirmDialog
        isOpen={dialogType === UserDialogType.DELETE}
        title="Remove User"
        body="⚠️ Are you sure you want to permanently remove this User?"
        onClose={handleCloseDialog}
        actions={[
          {
            text: "Cancel",
            onClick: handleCloseDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              handleCloseDialog();
              removeUser(selectedUser!.id);
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default UserDetails;
