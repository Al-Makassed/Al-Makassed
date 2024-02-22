export interface Department {
  id: string;
  name: string;
  headId: string;
}

export interface Field {
  id: string;
  content: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface getField {
  content: string;
}

export interface getDepartment {
  name: string;
}

export interface FocalPoint {
  name: string;
}

export interface User {
  id: string;
  fullName: string;
  userName: string;
  roles: string[];
}

export interface getUser {
  Image?: File;
}

export interface UserRequest {
  formData: FormData;
}

export interface UserRoles {
  id: string;
  roles: string[];
}

export interface UserDepartment {
  id: string;
  departmentId: string;
}

export interface EditFieldRequest {
  id: string;
  content: string;
  categoryId: string;
}
