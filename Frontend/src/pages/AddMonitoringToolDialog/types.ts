import { Field } from "./API/types";

export interface FieldItemProps {
  field: Field;
}

export interface AddMonitoringToolFormPayload {
  name: string;
  description: string;
  fieldsIdes: string[];
  departmentsIdes: string[];
}
