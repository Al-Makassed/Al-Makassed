import { Field, MonitoringToolResponse } from "./API/types";

export interface AddMonitoringToolFormPayload extends MonitoringToolResponse {}

export interface FieldItemProps {
  field: Field;
}
