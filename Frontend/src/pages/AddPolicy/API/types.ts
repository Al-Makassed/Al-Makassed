export interface Policy {
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
  code: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface PolicyResponse {
  Name: string;
  MainFile?: File;
  EstimatedTimeInMin: number;
  ChapterId: string;
  Summary: string;
}

export interface PolicyRequest {
  formData: FormData;
}
