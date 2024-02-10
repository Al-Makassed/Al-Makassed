export interface MonitoringToolResponse {
  name: string;
  description: string;
  fieldsIdes: string[];
  departmentsIdes: string[];
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

export interface Department {
  id: string;
  name: string;
  headId: string;
}
