export interface MonitoringToolRequest {
  formData: FormData;
}

export interface MonitoringToolResponse {
  name: string;
  summary: string;
  // fieldsIdes: string[]
  // departmentsIdes:string[]
}

export interface Field {
  fieldId: string;
  content: string;
}
