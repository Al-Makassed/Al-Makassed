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
import { DepartmentDialogType } from "../constants";

const DepartmentDetails: FC = () => {
  const [dialogType, setDialogType] = useState<DepartmentDialogType | null>(
    null,
  );

  const [selectedDepartment, setSelectedDepartment] = useState<Department>();

  const { departments } = useGetDepartments();

  const { removeDepartment } = useDeleteDepartment();

  const theme = useTheme<Theme>();

  const handleCloseDialog = () => setDialogType(null);

  const handleAddButtonClick = () => setDialogType(DepartmentDialogType.ADD);

  const handleDeleteButtonClicked = (department: Department) => {
    setSelectedDepartment(department);
    setDialogType(DepartmentDialogType.DELETE);
  };

  const handleEditButtonClick = (department: Department) => {
    setSelectedDepartment(department);
    setDialogType(DepartmentDialogType.EDIT);
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
      <Stack
        gap={1.5}
        width="100%"
        maxWidth={{ sm: "calc(100vw - 300px - 24px)" }}
        py={3}
        pl={{ xs: 2, sm: 0 }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddButtonClick}
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

      <AddDepartmentDialog
        open={dialogType === DepartmentDialogType.ADD}
        onClose={handleCloseDialog}
      />

      <EditDepartmentDialog
        open={dialogType === DepartmentDialogType.EDIT}
        onClose={handleCloseDialog}
        department={selectedDepartment!}
      />

      <ConfirmDialog
        isOpen={dialogType === DepartmentDialogType.DELETE}
        title="Remove Department"
        body="⚠️ Are you sure you want to permanently remove this department?"
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
