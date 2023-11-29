import { useFormik } from "formik";
// import validationSchema from "../schema";
import { initialValues } from "../constants";
import useAddMonitorintoolAPI from "./useAddMonitoringToolAPI";
import { AddMonitoringToolFormPayload } from "../types";

const useAddMonitoringToolForm = () => {
  const { addMonitoringTool, isAdding } = useAddMonitorintoolAPI();

  const submitForm = (values: AddMonitoringToolFormPayload) => {
    const formData = new FormData();
    formData.set("Name", values.name);
    formData.set("Summary", values.summary);

    addMonitoringTool({ formData });
  };

  const formikProps = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding };
};

export default useAddMonitoringToolForm;
