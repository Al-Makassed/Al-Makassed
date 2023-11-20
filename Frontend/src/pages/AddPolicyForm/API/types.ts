export interface Policy {
  id: string;
  code: string;
  name: string;
  state: boolean;
  file: string;
  chapterId: string;
  estimatedTime: number;
  summary: string;
  dependencies: Dependency[];
}

export interface Dependency {
  id: string;
  code: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface PolicyResponse {
  Name: string;
  Code: string;
  MainFile?: File;
  EstimatedTimeInMin: number;
  Summary: string;
}

export interface PolicyRequest {
  formData: FormData;
  chapterId: string;
}
