export interface FileEntity {
  id: string;
  name: string;
  chapterId: string;
  chapterName: string;
  createdAt: string;
  PdfUrl: string;
  type: FileEntityType;
}

export interface DependencyFileEntity extends FileEntity {
  policyId: string;
  policyName: string;
}

export enum FileEntityType {
  Policy,
  Dependency,
}

export interface FinishedFile {
  userId: string;
  name: string;
  readingState: number;
  lastAccessed: string;
  policy?: Policy;
  dependency?: Dependency;
  type: FileEntityType;
}

export interface FinishedPolicy extends FinishedFile {
  policyId: string;
  policy: Policy;
  type: FileEntityType.Policy;
}

export interface Policy {
  id: string;
  code: string;
  name: string;
  pdfUrl: string;
  summary: string;
  isApproved: boolean;
  chapter: Chapter;
}

export interface Chapter {
  id: string;
  name: string;
  enableState: boolean;
}

export interface FinishedDependency extends FinishedFile {
  dependencyId: string;
  dependency: Dependency;
  type: FileEntityType.Dependency;
}

export interface Dependency {
  id: string;
  name: string;
  pdfUrl: string;
  isApproved: boolean;
  policy: Policy;
}

export interface ReadingsPercentage {
  result: number;
}

export interface Announcement {
  id: string;
  body: string;
  isPinned: boolean;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  creatorFullName: string;
  creatorAvatarUrl: string;
}

export interface AnnouncementRequest {
  body: string;
  isPinned: boolean;
}
