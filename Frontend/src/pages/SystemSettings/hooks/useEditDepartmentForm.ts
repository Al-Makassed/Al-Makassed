import { useFormik } from "formik";
import { validationSchema } from "../schema";
import { EditDepartmentFormValues } from "../types";
import useEditDepartmentAPI from "./useEditDepartmentAPI";
import { Department } from "../API/type";

const useEditDepartmentForm = (department: Department) => {
  const { editDepartment, isRenaming } = useEditDepartmentAPI(department.id);

  const submitForm = (values: EditDepartmentFormValues) => {
    editDepartment({
      id: values.id,
      name: values.name,
      headId: values.headId,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: department.id,
      name: department.name,
      headId: department.headId,
    },
    validationSchema,
    onSubmit: submitForm,
    // enableReinitialize: true,
    // isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditDepartmentForm;
