import { Policy } from "./API/types";

export interface EditPolicy {
  newName: string;
  newCode: string;
  newEstimatedTimeInMin: number;
  newMainFile?: File;
  newSummary: string;
}

export interface UpdatePolicyProps {
  chapterId: string;
  policy?: Policy;
}
