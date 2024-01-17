import { useFormik } from "formik";
// import validationSchema from "../schema";
import { EditUserDepartmentFormValues } from "../types";
import useEditUserDepartmentAPI from "./useEditUserDepartmentAPI";
import { User } from "../API/type";

const useEditUserDepartmentForm = (User: User) => {
  const { editUserDepartment, isRenaming } = useEditUserDepartmentAPI(User.id);

  const submitForm = (values: EditUserDepartmentFormValues) => {
    editUserDepartment({
      id: values.id,
      departmentId: values.departmentId,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: User.id,
      departmentId: "",
    },
    // validationSchema,
    onSubmit: submitForm,
    // enableReinitialize: true,
    // isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditUserDepartmentForm;
