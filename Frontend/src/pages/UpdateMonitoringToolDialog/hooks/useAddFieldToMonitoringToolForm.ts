import { useFormik } from "formik";
import { addFieldToMTInitialValues } from "../constants";
import { addFieldToMTValidationSchema } from "../schema";
import { AddFieldsToMTFormPayload } from "../types";
import useAddFieldToMonitoringTool from "./useAddFieldToMonitoringTool";

const useAddFieldToMonitoringToolForm = (monitoringToolId: string) => {
  const { appendFieldToMT, isPending } = useAddFieldToMonitoringTool();

  const submitForm = (values: AddFieldsToMTFormPayload) => {
    appendFieldToMT({
      monitoringToolId,
      fieldsIdes: values.fieldsIdes,
    });
  };

  const formikProps = useFormik({
    initialValues: addFieldToMTInitialValues,
    validationSchema: addFieldToMTValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding: isPending };
};

export default useAddFieldToMonitoringToolForm;
