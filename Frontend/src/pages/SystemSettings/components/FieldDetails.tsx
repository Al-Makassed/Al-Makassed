import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState } from "react";
import ConfirmDialog from "src/components/ConfirmDialog";
import { Field } from "../API/type";
import { FieldDialogType } from "../constants";
import useDeleteField from "../hooks/useDeleteField";
import useGetFields from "../hooks/useGetFields";
import EditFieldDialog from "./EditFieldDialog";
import AddFieldDialog from "src/pages/AddFieldDialog/AddFieldDialog";

const FieldDetails: FC = () => {
  const [dialogType, setDialogType] = useState<FieldDialogType | null>(null);

  const [selectedField, setSelectedField] = useState<Field>();

  const { fields } = useGetFields();

  const { removeField } = useDeleteField();

  const theme = useTheme<Theme>();

  const handleCloseDialog = () => setDialogType(null);

  const handleAddButtonClicked = () => {
    setDialogType(FieldDialogType.ADD);
  };

  const handleDeleteButtonClicked = (field: Field) => {
    setSelectedField(field);
    setDialogType(FieldDialogType.DELETE);
  };

  const handleEditButtonClick = (field: Field) => {
    setSelectedField(field);
    setDialogType(FieldDialogType.EDIT);
  };

  const columns: GridColDef[] = [
    { field: "content", headerName: "Content", width: 650, flex: 0.35 },
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

  return (
    <>
      <Stack
        width="100%"
        maxWidth={{ sm: "calc(100vw - 300px - 24px)" }}
        gap={1.5}
        py={3}
        pl={{ xs: 2, sm: 0 }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddButtonClicked}
          sx={{ width: "fit-content" }}
        >
          Field
        </Button>

        <Typography variant="h6" fontWeight={500}>
          All Fields
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
          />
        </Grid>
      </Stack>

      <AddFieldDialog
        open={dialogType === FieldDialogType.ADD}
        onClose={handleCloseDialog}
      />

      <EditFieldDialog
        open={dialogType === FieldDialogType.EDIT}
        onClose={handleCloseDialog}
        field={selectedField!}
      />

      <ConfirmDialog
        isOpen={dialogType === FieldDialogType.DELETE}
        title="Remove Field"
        body="⚠️ Are you sure you want to permanently remove this field?"
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
