import { FocalPointTask, MonitoringTool } from "./API/types";

export interface MonitoringToolCardProps {
  monitoringTool: MonitoringTool;
  onOpen: () => void;
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
