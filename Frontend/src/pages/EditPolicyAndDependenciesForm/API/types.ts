export interface Policy {
  id: string;
  code: string;
  name: string;
  summary: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  dependencies: Dependency[];
}
export interface Dependency {
  id: string;
  code: string;
  name: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  type: number;
}
export interface UpdatePolicyRequest {
  chapterId: string;
  policyId: string;
  formData: FormData;
}

export interface DeletePolicyDependency {
  chapterId: string;
  policyId: string;
  dependencyId: string;
}
export interface GetPolicy extends Omit<UpdatePolicyRequest, "formData"> {}
export interface DeleteAllPolicyDependencies
  extends Omit<DeletePolicyDependency, "dependencyId"> {
  type: number;
}
