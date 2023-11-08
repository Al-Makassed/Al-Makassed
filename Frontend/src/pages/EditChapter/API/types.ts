export interface Chapter {
  id: string;
  name: string;
  enableState: boolean;
  policies: Policy[];
}

export interface Policy {
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
export interface RenameChapter {
  id: string;
  newChapterName: string;
}
