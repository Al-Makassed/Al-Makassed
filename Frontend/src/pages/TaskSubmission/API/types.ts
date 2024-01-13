export interface Field {
  id: string;
  content: string;
}

export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  fields: Field[];
}

export interface FocalPointTask {
  id: string;
  departmentId: string;
  monitoringTool: MonitoringTool;
  totalSubmissions: number;
  isFinished: boolean;
}

export interface AnsweredField {
  fieldId: string;
  answer: boolean;
}

export interface SubmissionRequest {
  departmentId: string;
  focalPointTaskId: string;
  answers: AnsweredField[];
}

export interface SubmissionLogRequest {
  departmentId: string;
  focalPointTaskId: string;
}

export interface Submitter {
  id: string;
  userName: string;
  fullName: string;
  avatarUrl: string;
}

export interface Submission {
  id: string;
  focalPointTaskId: string;
  number: number;
  submittedAt: string;
  submitter: Submitter;
}

export interface FieldAnswer {
  fieldId: string;
  submissionId: string;
  answer: boolean;
  field: Field;
}

export interface SubmissionDetails {
  id: string;
  focalPointTaskId: string;
  submissionId: string;
  number: number;
  submittedAt: string;
  answers: FieldAnswer[];
}
