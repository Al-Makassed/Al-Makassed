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
