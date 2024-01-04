// import {
//     Button,
//    IconButton,
//    Stack,
//    Tooltip,
//    Typography,
//  } from "@mui/material";
//  import React, { FC, useState } from "react";
//  import AddDepartmentDialog from "./AddDepartmentDialog";
//  import AddIcon from "@mui/icons-material/Add";
//  import useGetDepartments from "../hooks/useGetDepartments";
//  import DeleteIcon from "@mui/icons-material/Delete";
//  import EditIcon from "@mui/icons-material/Edit";
// //  import { Department } from "../API/type";
//  import { DataGrid, GridColDef} from "@mui/x-data-grid";
// //  import EditDepartmentDialog from "./EditDepartmentDialog";

//  import ConfirmDialog from "src/components/ConfirmDialog";
// //  import useDeleteDepartment from "../hooks/useDeleteDepartment";

//  const FieldDetails: FC= () => {
//    const [isDialogOpen, setIsDialogOpen] = useState(false);
//    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//    const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
//      useState<boolean>(false);
//    const { departments } = useGetDepartments();
//    const handleOpenDialog = () => setIsDialogOpen(true);
//    const handleCloseDialog = () => setIsDialogOpen(false);

//    const handleOpenEditDialog = () => setIsEditDialogOpen(true);
// //    const handleCloseEditDialog = () => setIsEditDialogOpen(false);

// //    const { removeDepartment } = useDeleteDepartment();

//    const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

//    const handleDeleteButtonClicked = () => setIsConfirmDialogOpen(true);

//    const columns: GridColDef[] = [
//      { field: "name", headerName: "Name", width: 450 },
//      {
//        field: "actions",
//        headerName: "Actions",
//        width: 200,
//        renderCell: () => (
//          <>
//            <Tooltip title="Edit department">
//              <IconButton
//                onClick={handleOpenEditDialog}
//                aria-label="Edit department"
//                sx={{ mr: 0.5 }}
//              >
//                <EditIcon />
//              </IconButton>
//            </Tooltip>

//            <Tooltip title="Delete department">
//              <IconButton
//                aria-label="Delete department"
//                sx={{ mr: 0.5 }}
//                color="error"
//                onClick={handleDeleteButtonClicked}
//              >
//                <DeleteIcon />
//              </IconButton>
//            </Tooltip>
//          </>
//        ),
//      },
//    ];

//    return (
//      <>
//      <Stack gap={1.5} width="73%" pt={3}>
//        <Button
//          startIcon={<AddIcon />}
//          variant="contained"
//          onClick={handleOpenDialog}
//          sx={{ width: "fit-content" }}
//        >
//         Field
//        </Button>
//        <AddDepartmentDialog open={isDialogOpen} onClose={handleCloseDialog} />
//        <Typography variant="h6" fontWeight={500}>
//          All Fields
//        </Typography>

//        <div style={{ height: 400, width: "100%" }}>
//          <DataGrid
//            rows={departments}
//            columns={columns}
//            initialState={{
//              pagination: {
//                paginationModel: { page: 0, pageSize: 5 },
//              },
//            }}
//            pageSizeOptions={[5, 10]}
//            checkboxSelection
//          />
//        </div>

//        {/* <EditDepartmentDialog
//          open={isEditDialogOpen}
//          onClose={handleCloseEditDialog}
//          department={department}
//        /> */}

//        <ConfirmDialog
//          isOpen={isConfirmDialogOpen}
//          title="Remove Department"
//          body="Are you sure you want to permanently remove department?"
//          onClose={closeConfirmDialog}
//          actions={[
//            {
//              text: "Cancel",
//              onClick: closeConfirmDialog,
//              sx: { color: "grey.700" },
//            },
//            {
//              text: "Delete",
//              onClick: () => {
//                closeConfirmDialog();
//             //    removeDepartment(department.id);
//                handleCloseDialog();
//              },
//              color: "error",
//            },
//          ]}
//        />
//      </Stack>
//      </>
//    );
//  };

//  export default FieldDetails;
