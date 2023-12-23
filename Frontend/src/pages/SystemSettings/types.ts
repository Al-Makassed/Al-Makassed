import { Department } from "./API/type";

export interface AddDepartmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface DepartmentListItemProps {
  department: Department;
}

export interface EditDepartmentFormValues {
  id: string;
  name: string;
  headId: string;
}
