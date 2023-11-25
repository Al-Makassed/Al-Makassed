import { AddPolicyDependencyResponse } from "./API/types";

export interface AddPolicyDependencyDialogProps {
  open: boolean;
  onClose: () => void;
  chapterId: string;
  policyId: string;
  type: number;
}

export interface PolicyDependenciesProps {
  chapterId: string;
  policyId: string;
}

export interface AddDependencyFormPayload extends AddPolicyDependencyResponse {}
