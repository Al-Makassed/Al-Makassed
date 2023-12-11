import { Department, Field, MonitoringTool } from "./API/types";

export interface DescriptionSectionProps {
  monitoringTool: MonitoringTool;
  isEditingMode: boolean;
}

export interface FieldsSectionProps {
  fields: Field[];
}

export interface DepartmentsSectionProps {
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
