export interface Policy {
  code: string;
  name: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  estimatedTime: number;
  dependencies: Dependency[];
}

export interface Dependency {
  code: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface CreatePolicyResponse extends Omit<Policy, "dependencies "> {}

export interface PolicyResponse {
  name: string;
  pdfUrl: string;
  estimatedTime: number;
  chapterId: string;
}
