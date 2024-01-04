import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import AddDepartmentDialog from "./AddDepartmentDialog";
import AddIcon from "@mui/icons-material/Add";
import useGetDepartments from "../hooks/useGetDepartments";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Department } from "../API/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditDepartmentDialog from "./EditDepartmentDialog";
import ConfirmDialog from "src/components/ConfirmDialog";
import useDeleteDepartment from "../hooks/useDeleteDepartment";

const DepartmentDetails: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();

  const { departments } = useGetDepartments();

  const { removeDepartment } = useDeleteDepartment();

  const handleCloseConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleOpenAddDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleOpenEditDialog = () => setIsEditDialogOpen(true);

  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const handleDeleteButtonClicked = (department: Department) => {
    setSelectedDepartment(department);
    setIsConfirmDialogOpen(true);
  };

  const handleEditButtonClick = (department: Department) => {
    setSelectedDepartment(department);
    handleOpenEditDialog();
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 450 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit department">
            <IconButton
              onClick={() => handleEditButtonClick(params.row)}
              aria-label="Edit department"
              sx={{ mr: 0.5 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete department">
            <IconButton
              aria-label="Delete department"
              sx={{ mr: 0.5 }}
              color="error"
              onClick={() => handleDeleteButtonClicked(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  console.log(isEditDialogOpen);

  return (
    <>
      <Stack gap={1.5} sx={{ border: "1px solid red" }} width="73%" pt={3}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenAddDialog}
          sx={{ width: "fit-content" }}
        >
          Department
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All departments
        </Typography>

        <Stack sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={departments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        </Stack>
      </Stack>

      <AddDepartmentDialog open={isDialogOpen} onClose={handleCloseDialog} />

      <EditDepartmentDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        department={selectedDepartment!}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove Department"
        body="Are you sure you want to permanently remove department?"
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
              removeDepartment(selectedDepartment!.id);
              handleCloseDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default DepartmentDetails;
