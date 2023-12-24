import { Field, FocalPointTask } from "./API/types";

export interface HeaderProps {
  focalPointTask: FocalPointTask;
}

export interface SubmissionFormProps {
  focalPointTask: FocalPointTask;
}

export interface FieldCardProps {
  field: Field;
  onAnswerChange: (fieldId: string, answer: boolean) => void;
}

export interface InformationCardProps {
  task: FocalPointTask;
}
