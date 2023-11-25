import { TabPanelProps } from "../types";

export interface EditPolicyFormProps {
  open: boolean;
  onClose: () => void;
  chapterId: string;
  policyId: string;
  props: TabPanelProps;
}
