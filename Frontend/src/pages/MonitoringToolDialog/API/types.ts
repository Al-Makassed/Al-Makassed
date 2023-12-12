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
  createdAt: string;
  isApproved: boolean;
  creatorId: string;
  fields: Field[];
  departments: Department[];
}

export interface UpdateMonitoringToolRequest {
  monitoringToolId: string;
  name: string;
  description: string;
}

export interface DeleteMonitoringToolFieldRequest {
  monitoringToolId: string;
  fieldId: string;
}
