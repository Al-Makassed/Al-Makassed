import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import UserAvatar from "src/components/UserAvatar";
import { formatDate } from "src/utils";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import { ApprovalRequest } from "./API/Types";
import { REQUEST_NAME } from "./constants";
import useApprovedMonitoringTool from "./hooks/useApproveMonitoringTool";
import useApprovedPolicy from "./hooks/useApprovePolicy";
import useApprovedPolicyDependency from "./hooks/useApprovePolicyDependency";
import useDeleteDependency from "./hooks/useDeleteDependency";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
import useDeletePolicy from "./hooks/useDeletePolicy";
import useApprovedRequests from "./hooks/useGetRequestsApproval";
import { RequestsDataGridProps } from "./types";

const RequestsDataGrid: FC<RequestsDataGridProps> = ({
  setApprovalRequest,
  setOpenedDialog,
}) => {
  const { requests } = useApprovedRequests();

  const handleViewButtonClicked = (row: ApprovalRequest) => {
    setOpenedDialog(row.entityType);

    setApprovalRequest(row);
  };

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <UserAvatar
            src={params.row.requesterAvatarUrl}
            initials={getAvatarAbbreviation(params.row.requesterUserName)}
          />
          <Typography>{params.row.requesterUserName}</Typography>
        </Stack>
      ),
    },

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
      width: 220,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "approved",
      headerName: "Approve?",
      width: 140,
      renderCell: (params) => (
        <>
          <Tooltip title="Approve">
            <IconButton
              aria-label="Approve"
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
      width: 130,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              onClick={() => handleViewButtonClicked(params.row)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const { approvePolicy } = useApprovedPolicy();
  const { deletePolicy } = useDeletePolicy();
  const { removeMonitoringTool } = useDeleteMonitoringTool();
  const { approvedPolicyDependency } = useApprovedPolicyDependency();
  const { approvedMonitoringTool } = useApprovedMonitoringTool();
  const { deleteDependency } = useDeleteDependency();

  const handleApproval = (row: ApprovalRequest) => {
    if (row.entityType === 0) {
      approvePolicy(row.entityId);
    } else if (row.entityType === 1) {
      approvedPolicyDependency(row.entityId);
    } else {
      approvedMonitoringTool(row.entityId);
    }
  };

  const handleDeleteRequest = (row: ApprovalRequest) => {
    if (row.entityType === 0) {
      deletePolicy({ chapterId: row.info.chapterId, policyId: row.entityId });
    } else if (row.entityType === 1) {
      deleteDependency({
        chapterId: row.info.chapterId,
        policyId: row.info.policyId,
        id: row.entityId,
      });
    } else {
      removeMonitoringTool(row.entityId);
    }
  };

  return (
    <DataGrid
      sx={{ pl: 1, pr: 1 }}
      rows={requests}
      columns={columns}
      getRowId={(row) => row.entityId}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 8 },
        },
      }}
      pageSizeOptions={[5, 8, 20]}
    />
  );
};

export default RequestsDataGrid;
