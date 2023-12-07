import { useFormik } from "formik";
// import validationSchema from "../schema";
import { initialValues } from "../constants";
import useAddMonitorintoolAPI from "./useAddMonitoringToolAPI";
import { AddMonitoringToolFormPayload } from "../types";

const useAddMonitoringToolForm = () => {
  const { addMonitoringTool, isAdding } = useAddMonitorintoolAPI();

  const submitForm = (values: AddMonitoringToolFormPayload) => {
    addMonitoringTool({
      name: values.name,
      description: values.description,
      departmentsIdes: values.departmentsIdes,
    });
  };

  const formikProps = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding };
};

export default useAddMonitoringToolForm;
