export interface DependencyResponse {
  id: string;
  chapterId: string;
  policyId: string;
  code: string;
  name: string;
  url: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface AddPolicyDependencyResponse {
  code: string;
  name: string;
  mainFile: undefined;
  estimatedTime: number;
  type: number;
}

export interface DependencyRequest {
  formData: FormData;
  chapterId: string;
  policyId: string;
}
