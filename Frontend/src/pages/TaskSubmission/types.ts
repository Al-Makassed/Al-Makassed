import { Field, FocalPointTask, Submission } from "./API/types";

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

export interface DetailsPanelProps {
  value: number;
  totalSubmissions: number;
  description: string;
}

export interface ActivityPanelProps {
  value: number;
  focalPointTaskId: string;
  departmentId: string;
}

export interface ActivitySegmentProps {
  submission: Submission;
  onSelectedSubmissionChange: (submissionId: string) => void;
}

export interface SubmissionDialogProps {
  submissionId: string;
  isOpen: boolean;
  onClose: () => void;
}
