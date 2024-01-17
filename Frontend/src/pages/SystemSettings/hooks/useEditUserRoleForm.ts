import { useFormik } from "formik";
// import validationSchema from "../schema";
import { EditUserRoleFormValues } from "../types";
import useEditUserRoleAPI from "./useEditUserRoleAPI";
import { User } from "../API/type";

const useEditUserRoleForm = (User: User) => {
  const { editUserRole, isRenaming } = useEditUserRoleAPI(User.id);

  const submitForm = (values: EditUserRoleFormValues) => {
    editUserRole({
      id: values.id,
      roles: values.roles,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: User.id,
      roles: User.roles,
    },
    // validationSchema,
    onSubmit: submitForm,
    // enableReinitialize: true,
    // isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditUserRoleForm;
