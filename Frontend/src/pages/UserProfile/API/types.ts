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
}
