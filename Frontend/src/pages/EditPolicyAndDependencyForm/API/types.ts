export interface Policy {
  code: string;
  name: string;
  summary: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  dependencies: Dependency[];
}
export interface Dependency {
  code: string;
  name: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}
export interface UpdatePolicyRequest {
  code: string;
  formData: FormData;
}
export interface DeleteAllPolicyDependencies {
  type: number;
  code: string;
}
