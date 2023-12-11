// export interface MonitoringToolRequest {
//   formData: FormData;
// }

export interface MonitoringToolResponse {
  name: string;
  description: string;
  // fieldsIdes: string[]
  departmentsIdes: string[];
}

export interface Field {
  id: string;
  content: string;
}

export interface Department {
  departmentId: string;
  name: string;
  headId: string;
}
