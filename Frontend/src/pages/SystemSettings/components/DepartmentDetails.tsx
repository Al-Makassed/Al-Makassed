import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState } from "react";
import ConfirmDialog from "src/components/ConfirmDialog";
import { Department } from "../API/type";
import useDeleteDepartment from "../hooks/useDeleteDepartment";
import useGetDepartments from "../hooks/useGetDepartments";
import AddDepartmentDialog from "./AddDepartmentDialog";
import EditDepartmentDialog from "./EditDepartmentDialog";

const DepartmentDetails: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();

  const { departments } = useGetDepartments();

  const { removeDepartment } = useDeleteDepartment();

  const theme = useTheme<Theme>();

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
    { field: "name", headerName: "Name", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
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

  return (
    <>
      <Stack gap={1.5} width="73%" py={3} sx={{ ml: { xs: 2, md: 0 } }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenAddDialog}
          sx={{ width: "fit-content" }}
        >
          Department
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All Departments
        </Typography>

        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            height: `calc(100vh - 48px - 36.5px - 32px - 24px - ${theme.mixins.toolbar.height}px)`,
          }}
        >
          <DataGrid
            rows={departments}
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
            sx={{ bgcolor: (theme) => theme.palette.grey[100] }}
          />
        </Grid>
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
        body="⚠️ Are you sure you want to permanently remove this department?"
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
