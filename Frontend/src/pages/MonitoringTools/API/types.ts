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
