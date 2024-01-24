export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  department: Department;
  phoneNumber: string;
  avatarUrl: string;
  role: string[];
  createdOn: string;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
  head: Head;
}

export interface Head extends Partial<User> {
  fullName: string;
  userName: string;
  email: string;
  avatarUrl: string;
}

export interface PatchDocument {
  op: string;
  path: string;
  value: string;
}

export interface ReadingsPercentage {
  result: number;
}

export interface FinishedFile {
  userId: string;
  name: string;
  readingState: number;
  lastAccessed: string;
  policy?: Policy;
  dependency?: Dependency;
  type: "policy" | "dependency";
}

export interface FinishedPolicy extends FinishedFile {
  policyId: string;
  policy: Policy;
  type: "policy";
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
  type: "dependency";
}

export interface Dependency {
  id: string;
  name: string;
  pdfUrl: string;
  isApproved: boolean;
  policy: Policy;
}
