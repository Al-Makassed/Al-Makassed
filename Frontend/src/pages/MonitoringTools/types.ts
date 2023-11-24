export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
}

export interface MonitoringToolCardProps {
  monitoringTool: MonitoringTool;
}
