import { Head } from "./API/types";
import { ChoiceName } from "./constants";

export interface SideCardProps {
  choice: ChoiceName;
  setChoice: (choice: ChoiceName) => void;
}

export interface DetailsSectionProps {
  head: Head;
}

export interface DepartmentPartProps {
  head: Head;
}
