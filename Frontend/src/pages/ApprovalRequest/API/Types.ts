import { RequestEntityType } from "../constants";

export interface ApprovalRequest {
  title: string;
  createdAt: string;
  requesterId: string;
  entityType: RequestEntityType;
  entityId: string;
  info: Info;
}
// export interface PolicyApprovalRequest {
//   title: string;
//   createdAt: string;
//   requesterId: string;
//   entityType: RequestEntityType;
//   entityId: string;
//   info: PolicyInfo;
// }
export interface Info {
  chapterId: string;
  policyId: string;
}
// export interface PolicyInfo extends Info {
//   chapterId: string; ////To Edit this
// }
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
export interface DeletePolicy {
  chapterId: string;
  policyId: string;
}

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
  id: string;
  name: string;
  code: string;
  pdfUrl: string;
  type: number;
  estimatedTime: number;
  pagesCount: number;
  createdAt: string;
  isApproved: boolean;
  creatorId: string;
}
export interface GetDependency {
  chapterId: string;
  policyId: string;
  id: string;
}
