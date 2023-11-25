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
