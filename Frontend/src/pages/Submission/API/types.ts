export interface Field {
  id: string;
  content: string;
}

export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  fields: Field[];
}

export interface FocalPointTask {
  id: string;
  departmentId: string;
  monitoringTool: MonitoringTool;
  totalSubmissions: number;
  isFinished: boolean;
}
