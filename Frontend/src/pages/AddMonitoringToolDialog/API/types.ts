export interface MonitoringToolResponse {
  name: string;
  description: string;
  fieldsIdes: string[];
  departmentsIdes: string[];
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
