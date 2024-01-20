import { Policy } from "./API/types";
import { PolicyDependencyType } from "./constants";

export interface ViewPolicyInfoProps {
  policy: Policy;
}

export interface DependenciesListProps {
  chapterId: string;
  policyId: string;
  type: PolicyDependencyType;
}
