import { ApprovalRequest, Info } from "./API/Types";
import { RequestEntityType } from "./constants";

export interface ViewMonitoringToolDialogProps {
  monitoringToolId: string;
  open: boolean;
  onClose: () => void;
}

export interface ViewPolicyDialogProps {
  info: Info;
  policyId: string;
  open: boolean;
  onClose: () => void;
}

export interface ViewDependencyDialogProps {
  info: Info;
  dependencyId: string;
  open: boolean;
  onClose: () => void;
}

export interface RequestsDataGridProps {
  setOpenedDialog: (r: RequestEntityType) => void;
  setApprovalRequest: (a: ApprovalRequest) => void;
}
