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
  fields: Field[];
  departments: Department[];
}
