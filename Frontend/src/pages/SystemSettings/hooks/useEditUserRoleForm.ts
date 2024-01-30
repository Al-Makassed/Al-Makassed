import { useFormik } from "formik";
import { User } from "../API/type";
import { roleValidationSchema } from "../schema";
import { EditUserRoleFormValues } from "../types";
import useEditUserRoleAPI from "./useEditUserRoleAPI";

const useEditUserRoleForm = (User: User) => {
  const { editUserRole, isRenaming } = useEditUserRoleAPI(User.id);

  const submitForm = (values: EditUserRoleFormValues) => {
    const { id, roles } = values;
    editUserRole({
      id,
      roles: roles ? [roles.name] : [],
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: User.id,
      roles: { name: User.roles[0] },
    },
    validationSchema: roleValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isRenaming };
};

export default useEditUserRoleForm;
