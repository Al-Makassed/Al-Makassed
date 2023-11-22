export interface Policy {
  id: string;
  code: string;
  name: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
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
