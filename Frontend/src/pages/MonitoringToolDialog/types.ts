import { Department, Field, MonitoringTool } from "./API/types";

export interface DescriptionSectionProps {
  monitoringTool: MonitoringTool;
}

export interface FieldsSectionProps {
  monitoringToolId: string;
  fields: Field[];
}

export interface DepartmentsSectionProps {
  monitoringToolId: string;
  departments: Department[];
}

export interface SectionHeaderProps {
  title: string;
}

export interface HeaderTextFieldProps {
  monitoringTool: MonitoringTool;
  isEditingMode: boolean;
}

export interface SubmitButtonProps {
  monitoringTool: MonitoringTool;
  isEditingMode: boolean;
}

export interface DialogBodyAndFooterProps {
  monitoringTool: MonitoringTool;
}

export interface DatesChipsProps {
  createdAt: string;
  lastModified: string;
}
