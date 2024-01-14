import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { FC, useState } from "react";
// import AddDepartmentDialog from "./AddDepartmentDialog";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Field } from "../API/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ConfirmDialog from "src/components/ConfirmDialog";
import { grey } from "@mui/material/colors";
import AddFieldDialog from "./AddFieldDialog";
import useGetFields from "../hooks/useGetFields";
import useDeleteField from "../hooks/useDeleteField";
import EditFieldDialog from "./EditFieldDialog";

const FieldDetails: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<Field>();

  const { fields } = useGetFields();

  const { removeField } = useDeleteField();

  const handleCloseConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleOpenAddDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleOpenEditDialog = () => setIsEditDialogOpen(true);

  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const handleDeleteButtonClicked = (field: Field) => {
    setSelectedField(field);
    setIsConfirmDialogOpen(true);
  };

  const handleEditButtonClick = (field: Field) => {
    setSelectedField(field);
    handleOpenEditDialog();
  };

  const columns: GridColDef[] = [
    { field: "content", headerName: "Name", width: 650 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit field">
            <IconButton
              onClick={() => handleEditButtonClick(params.row)}
              aria-label="Edit field"
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
  console.log(fields);

  return (
    <>
      <Stack gap={1.5} width="73%" pt={3} sx={{ ml: { xs: 2, md: 0 } }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenAddDialog}
          sx={{ width: "fit-content" }}
        >
          Field
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All fields
        </Typography>

        <Stack sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={fields}
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
            sx={{ width: { xs: 320, md: 650, lg: 1100 }, bgcolor: grey[100] }}
          />
        </Stack>
      </Stack>

      <AddFieldDialog open={isDialogOpen} onClose={handleCloseDialog} />

      <EditFieldDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        field={selectedField!}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove Field"
        body="Are you sure you want to permanently remove this field?"
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
              removeField(selectedField!.id);
              handleCloseDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default FieldDetails;
