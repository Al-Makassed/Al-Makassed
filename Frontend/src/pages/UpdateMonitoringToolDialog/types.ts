import { Department, Field, MonitoringTool } from "./API/types";
import { DialogName } from "./constants";

export interface DescriptionSectionProps {
  monitoringTool: MonitoringTool;
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

export interface DialogBodyAndFooterProps {
  monitoringTool: MonitoringTool;
}

export interface DatesChipsProps {
  createdAt: string;
  lastModified: string;
}

export interface MonitoringToolDialogState {
  isEditingMode: boolean;
  openedDialog: DialogName | null;
}

export type MonitoringToolsReducerAction =
  | { type: "SetIsEditingMode" }
  | { type: "SetOpenDialog"; payload: DialogName };

export interface AppendFieldsDialogProps {
  existedFields: Field[];
}

export interface AssignDepartmentDialogProps {
  assignedDepartments: Department[];
}

export interface FieldsCheckboxListProps {
  fields: Field[];
  selectedItems: string[];
  onToggle: (fieldId: string) => void;
}

export interface AssignDepartmentsPayload {
  departmentsIdes: string[];
}

export interface NameAndDescriptionSectionsProps {
  monitoringTool: MonitoringTool;
}
