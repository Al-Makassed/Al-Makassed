export enum SearchEntityType {
  Chapter,
  Policy,
  Dependency,
  MonitoringTool,
  FocalPointTask,
}

export enum PolicyDependencyType {
  Form,
  Poster,
  Protocol,
}

export interface SearchResponse {
  id: string;
  name: string;
  createdAt: string;
  searchEntityType: SearchEntityType;
}

export interface ChapterSearchResponse extends SearchResponse {
  searchEntityType: SearchEntityType.Chapter;
  enableState: boolean;
}

export interface PolicySearchResponse extends SearchResponse {
  searchEntityType: SearchEntityType.Policy;
  code: string;
  summary: string;
  isApproved: boolean;
  chapterId: string;
}

export interface DependencySearchResponse extends SearchResponse {
  searchEntityType: SearchEntityType.Dependency;
  code: string;
  type: PolicyDependencyType;
  isApproved: boolean;
  policyId: string;
  pdfUrl: string;
}

export interface MonitoringToolSearchResponse extends SearchResponse {
  searchEntityType: SearchEntityType.MonitoringTool;
  description: string;
  lastModified: string;
  isApproved: boolean;
}

export interface Field {
  id: string;
  content: string;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
}

export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  createdAt: string;
  isApproved: boolean;
  creatorId: string;
  fields: Field[];
  departments: Department[];
}
