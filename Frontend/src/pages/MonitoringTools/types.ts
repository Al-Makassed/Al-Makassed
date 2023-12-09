import { FocalPointTask, MonitoringTool } from "./API/types";

export interface CardBodyProps {
  isFinished?: boolean;
  monitoringTool: MonitoringTool;
}

export interface FocalPointTaskProps {
  focalPointTask: FocalPointTask;
}

export interface MonitoringToolCardProps {
  monitoringTool: MonitoringTool;
}
