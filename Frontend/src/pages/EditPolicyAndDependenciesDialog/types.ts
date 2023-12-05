import { Policy } from "./API/types";

export interface EditPolicy {
  newName: string;
  newCode: string;
  newEstimatedTimeInMin: number;
  newMainFile?: File;
  newSummary: string;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface UpdatePolicyProps {
  chapterId: string;
  policy?: Policy;
}
