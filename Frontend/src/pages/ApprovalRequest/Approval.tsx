import { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDate } from "src/utils";
import useApprovedRequests from "./hooks/useGetApprovalRequests";
import { ApprovalRequest, PolicyApprovalRequest } from "./API/Types";
import { REQUEST_NAME } from "./constants";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import useApprovedPolicy from "./hooks/useApprovedPolicy";
import useApprovedPolicyDependency from "./hooks/useApprovedPolicyDependency";
import useApprovedMonitoringTool from "./hooks/useApprovedMonitoringTool";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
import useDeletePolicy from "./hooks/useDeletePolicy";

const DataTable: FC = () => {
  const { requests } = useApprovedRequests();

  const { approvePolicy } = useApprovedPolicy();

  const { deletePolicy } = useDeletePolicy();

  // const { deleteDependency } = useDeleteDependency();

  const { removeMonitoringTool } = useDeleteMonitoringTool();

  const { approvedPolicyDependency } = useApprovedPolicyDependency();

  const { approvedMonitoringTool } = useApprovedMonitoringTool();

  const handleApproval = (row: ApprovalRequest) => {
    if (row.entityType === 0) approvePolicy(row.entityId);
    else if (row.entityType === 1) approvedPolicyDependency(row.entityId);
    else approvedMonitoringTool(row.entityId);

    // console.log("Approve button clicked for row with ID:", row);
  };

  const handle = (row: ApprovalRequest) => {
    console.log("Approve button clicked for row with ID:", row);
  };

  const handleDeleteRequest = (row: PolicyApprovalRequest) => {
    if (row.entityType === 0)
      deletePolicy({ chapterId: row.info.chapterId, policyId: row.entityId });
    // else if (row.entityType === 1)
    //   deleteDependency({
    //     chapterId: row.info.chapterId,
    //     policyId: row.entityId,
    //     dependencyId: row.entityId,
    //   });
    else removeMonitoringTool(row.entityId);
  };

  const columns: GridColDef[] = [
    { field: "requesterId", headerName: "User ID", width: 200 },
    { field: "title", headerName: "Request name", width: 300 },
    {
      field: "entityType",
      headerName: "Type",
      width: 200,
      renderCell: (params) => <>{REQUEST_NAME.get(params.row.entityType)}</>,
    },
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
              onClick={() => handleApproval(params.row)}
            >
              <CheckBoxIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => handleDeleteRequest(params.row)}
            >
              <DisabledByDefaultIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton aria-label="View" onClick={() => handle(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Stack sx={{ alignItems: "center", pt: 1 }}>
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
