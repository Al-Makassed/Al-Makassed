import { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDate } from "src/utils";
import useApprovedRequests from "./hooks/useGetApprovalRequests";
// import useApprovedPolicy from "./hooks/useApprovedPolicy";
import { ApprovalRequests } from "./API/Types";

// const { approvedPolicy, isApprovedPolicy } = useApprovedPolicy();
// const handleApprovalPolicy = (row: ApprovalRequests) => approvedPolicy(row.info.id);

const columns: GridColDef[] = [
  { field: "requesterId", headerName: "User ID", width: 200 },

  { field: "title", headerName: "Request name", width: 300 },

  {
    field: "createdAt",
    headerName: "Date Created",
    width: 300,
    valueFormatter: (params) => formatDate(params.value),
  },

  {
    field: "approved",
    headerName: "Approved",
    width: 200,
    renderCell: (params) => (
      <>
        <Tooltip title="Approved">
          <IconButton
            aria-label="Approved"
            sx={{ mr: 1.5 }}
            onClick={() => handleApproval(params.row)}
          >
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={() => handleApproval(params.row)}
          >
            <ClearIcon color="error" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <>
        <Tooltip title="View">
          <IconButton
            aria-label="View"
            onClick={() => handleApproval(params.row)}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

//:( مش جاهزة لسا
const handleApproval = (row: ApprovalRequests) => {
  console.log("Approve button clicked for row with ID:", row);
};

export const DataTable: FC = () => {
  const { requests } = useApprovedRequests();

  return (
    <Stack sx={{ alignItems: "center" }}>
      <DataGrid
        sx={{ pl: 1, pr: 1 }}
        rows={requests}
        columns={columns}
        getRowId={(row) => row.info.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 8, 20]}
      />
    </Stack>
  );
};

export default DataTable;
