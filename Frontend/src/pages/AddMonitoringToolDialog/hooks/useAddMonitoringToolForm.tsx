import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import useAddMonitoringToolAPI from "./useAddMonitoringToolAPI";
import { AddMonitoringToolFormPayload } from "../types";

const useAddMonitoringToolForm = () => {
  const { addMonitoringTool, isAdding } = useAddMonitoringToolAPI();

  const submitForm = (values: AddMonitoringToolFormPayload) => {
    addMonitoringTool({
      name: values.name,
      description: values.description,
      departmentsIdes: values.departmentsIdes,
      fieldsIdes: values.fieldsIdes,
    });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding };
};

export default useAddMonitoringToolForm;
