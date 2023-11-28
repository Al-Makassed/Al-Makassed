import { FocalPointTask, MonitoringTool } from "./API/types";

export interface MonitoringToolCardProps {
  monitoringTool: MonitoringTool;
}

export interface CardBodyProps {
  monitoringTool: MonitoringTool;
  isFinished?: boolean;
}

export interface FocalPointTaskProps {
  focalPointTask: FocalPointTask;
}

export interface AddFieldDialogProps {
  open: boolean;
  onClose: () => void;
}
