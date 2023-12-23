import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import useAddDepartmentAPI from "./useAddDepartmentAPI";
import { getDepartment } from "../API/type";

const useAddDepartmentForm = () => {
  const { addNewDepartment, isPending } = useAddDepartmentAPI();

  const submitForm = (values: getDepartment) => {
    addNewDepartment(values.name);
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending };
};

export default useAddDepartmentForm;
