import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { formatDate } from "src/utils";
import { ApprovalRequest } from "./API/Types";
import ViewDependencyDialog from "./components/ViewDependencyDialog";
import ViewMonitoringToolDialog from "./components/ViewMonitoringToolDialog";
import ViewPolicyDialog from "./components/ViewPolicyDialog";
import { DialogName, REQUEST_NAME } from "./constants";
import useApprovedMonitoringTool from "./hooks/useApprovedMonitoringTool";
import useApprovedPolicy from "./hooks/useApprovedPolicy";
import useApprovedPolicyDependency from "./hooks/useApprovedPolicyDependency";
import useDeleteDependency from "./hooks/useDeleteDependency";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
import useDeletePolicy from "./hooks/useDeletePolicy";
import useApprovedRequests from "./hooks/useGetApprovalRequests";

const DataTable: FC = () => {
  const { requests } = useApprovedRequests();

  const [openedDialog, setOpenedDialog] = useState<DialogName | null>(null);
  const closeConfirmDialog = () => setOpenedDialog(null);

  const openViewPolicyDialog = () => setOpenedDialog(DialogName.ViewPolicy);

  const openViewMonitoringToolDialog = () =>
    setOpenedDialog(DialogName.ViewMonitoringTool);

  const openViewDependencyDialog = () =>
    setOpenedDialog(DialogName.ViewDependency);

  const { approvePolicy } = useApprovedPolicy();

  const { deletePolicy } = useDeletePolicy();

  const { removeMonitoringTool } = useDeleteMonitoringTool();

  const { approvedPolicyDependency } = useApprovedPolicyDependency();

  const { approvedMonitoringTool } = useApprovedMonitoringTool();

  const { deleteDependency } = useDeleteDependency();

  const theme = useTheme();

  const handleApproval = (row: ApprovalRequest) => {
    if (row.entityType === 0) approvePolicy(row.entityId);
    else if (row.entityType === 1) approvedPolicyDependency(row.entityId);
    else approvedMonitoringTool(row.entityId);
  };

  const handleDeleteRequest = (row: ApprovalRequest) => {
    if (row.entityType === 0)
      deletePolicy({ chapterId: row.info.chapterId, policyId: row.entityId });
    else if (row.entityType === 1)
      deleteDependency({
        chapterId: row.info.chapterId,
        policyId: row.info.policyId,
        id: row.entityId,
      });
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
            <IconButton aria-label="View" onClick={() => handle(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const [chapterId, setChapterId] = useState<string>("");
  const [policyId, setPolicyId] = useState<string>("");
  const [entityType, setEntityType] = useState<number>();
  const [monitoringToolId, setMonitoringToolId] = useState<string>("");
  const [dependencyId, setDependencyId] = useState<string>("");

  const handle = (row: ApprovalRequest) => {
    setEntityType(row.entityType);

    if (entityType === 0) {
      setChapterId(row.info.chapterId);
      setPolicyId(row.entityId);
      openViewPolicyDialog();
    } else if (entityType === 2) {
      setMonitoringToolId(row.entityId);
      openViewMonitoringToolDialog();
    } else if (entityType === 1) {
      setChapterId(row.info.chapterId);
      setPolicyId(row.info.policyId);
      setDependencyId(row.entityId);
      openViewDependencyDialog();
    }
  };

  return (
    <>
      <Stack p={4} gap={3}>
        <Typography variant="h4" pl={1.15}>
          Approval Requests
        </Typography>

        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          // maxWidth="1300px"
          height={`calc(100vh - 42px - 64px - 24px - ${theme.mixins.toolbar.height}px)`}
        >
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
        </Grid>
      </Stack>

      {entityType === 0 && (
        <ViewPolicyDialog
          chapterId={chapterId}
          policyId={policyId}
          open={openedDialog === DialogName.ViewPolicy}
          onClose={closeConfirmDialog}
        />
      )}

      {entityType === 1 && (
        <ViewDependencyDialog
          chapterId={chapterId}
          policyId={policyId}
          dependencyId={dependencyId}
          open={openedDialog === DialogName.ViewDependency}
          onClose={closeConfirmDialog}
        />
      )}

      {entityType === 2 && (
        <ViewMonitoringToolDialog
          monitoringToolId={monitoringToolId}
          open={openedDialog === DialogName.ViewMonitoringTool}
          onClose={closeConfirmDialog}
        />
      )}
    </>
  );
};

export default DataTable;
