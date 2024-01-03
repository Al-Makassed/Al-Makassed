export interface ViewMonitoringToolDialogProps {
  monitoringToolId: string;
  open: boolean;
  onClose: () => void;
}

export interface ViewPolicyDialogProps {
  chapterId: string;
  policyId: string;
  open: boolean;
  onClose: () => void;
}
