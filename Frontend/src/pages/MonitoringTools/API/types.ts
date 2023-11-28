export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
}

export interface FocalPointTask {
  id: string;
  departmentId: string;
  monitoringTool: MonitoringTool;
  totalSubmissions: number;
  isFinished: boolean;
}

export interface Field {
  id: string;
  content: string;
}

export interface CreateFieldRequest {
  content: string;
}
