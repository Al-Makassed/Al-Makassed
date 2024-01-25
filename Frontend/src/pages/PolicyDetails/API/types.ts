export interface Policy {
  id: string;
  code: string;
  name: string;
  state: boolean;
  pdfUrl: string;
  summary: string;
  chapterId: string;
  dependencies: Dependency[];
}

export interface Dependency {
  id: string;
  name: string;
  code: string;
  type: number;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}
