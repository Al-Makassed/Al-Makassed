import { Grid, Stack, Theme, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { ApprovalRequest } from "./API/Types";
import RequestsDataGrid from "./RequestsDataGrid";
import ViewDependencyDialog from "./components/ViewDependencyDialog";
import ViewMonitoringToolDialog from "./components/ViewMonitoringToolDialog";
import ViewPolicyDialog from "./components/ViewPolicyDialog";
import { RequestEntityType } from "./constants";

const DataTable: FC = () => {
  const [openedDialog, setOpenedDialog] = useState<RequestEntityType | null>(
    null,
  );
  const [approvalRequest, setApprovalRequest] =
    useState<ApprovalRequest | null>(null);

  const closeConfirmDialog = () => setOpenedDialog(null);

  const theme = useTheme<Theme>();

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
          height={`calc(100vh - 42px - 64px - 24px - ${theme.mixins.toolbar.height}px)`}
        >
          <RequestsDataGrid
            setOpenedDialog={setOpenedDialog}
            setApprovalRequest={setApprovalRequest}
          />
          ;
        </Grid>
      </Stack>

      {openedDialog === RequestEntityType.Policy && (
        <ViewPolicyDialog
          info={approvalRequest!.info}
          policyId={approvalRequest!.entityId}
          open={openedDialog === RequestEntityType.Policy}
          onClose={closeConfirmDialog}
        />
      )}

      {openedDialog === RequestEntityType.Dependency && (
        <ViewDependencyDialog
          info={approvalRequest!.info}
          dependencyId={approvalRequest!.entityId}
          open={openedDialog === RequestEntityType.Dependency}
          onClose={closeConfirmDialog}
        />
      )}

      {openedDialog === RequestEntityType.MonitoringTool && (
        <ViewMonitoringToolDialog
          monitoringToolId={approvalRequest!.entityId}
          open={openedDialog === RequestEntityType.MonitoringTool}
          onClose={closeConfirmDialog}
        />
      )}
    </>
  );
};

export default DataTable;
