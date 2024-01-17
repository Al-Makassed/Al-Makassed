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

export interface EditUserRoleFormValues {
  id: string;
  roles: string[];
}

export interface EditUserDepartmentFormValues {
  id: string;
  departmentId: string;
}

export interface Role {
  name: string;
}

export const role: Role[] = [
  {
    name: "Admin",
  },
  {
    name: "Sub-Admin",
  },
  {
    name: "Focal Point",
  },
  {
    name: "Staff",
  },
];
