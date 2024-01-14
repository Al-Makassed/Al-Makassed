export interface Department {
  id: string;
  name: string;
  headId: string;
}

export interface Field {
  id: string;
  content: string;
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
}

export interface getUser {}
