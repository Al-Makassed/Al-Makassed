export interface AddPolicyDependencyResponse {
  code: string;
  name: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface DragAndDropProps {
  name: string;
}

export interface Dependency {
  id: number;
  name: string;
}
