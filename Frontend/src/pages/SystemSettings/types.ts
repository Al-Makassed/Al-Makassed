export interface AddDepartmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface EditDepartmentFormValues {
  id: string;
  name: string;
  headId: string;
}
