import { AddPolicyDependencyResponse } from "./API/types";
import { PolicyDependencyType } from "./constants";

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

export interface DependenciesListProps {
  chapterId: string;
  policyId: string;
  type: PolicyDependencyType;
}

export interface AddDependencyFormPayload extends AddPolicyDependencyResponse {}
