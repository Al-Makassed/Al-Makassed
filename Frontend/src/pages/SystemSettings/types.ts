export interface AddDepartmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface EditDepartmentFormValues {
  id: string;
  name: string;
  headId: string;
}

export interface EditFieldFormValues {
  id: string;
  content: string;
}
