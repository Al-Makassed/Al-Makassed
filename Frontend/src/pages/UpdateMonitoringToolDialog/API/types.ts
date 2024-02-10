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

export interface DeleteMonitoringToolDepartmentRequest {
  monitoringToolId: string;
  departmentId: string;
}

export interface AddFieldToMonitoringToolRequest {
  monitoringToolId: string;
  fieldsIdes: string[];
}

export interface AssignMonitoringToolToDepartmentRequest {
  monitoringToolId: string;
  departmentsIdes: string[];
}
