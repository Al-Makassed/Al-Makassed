import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { EditPolicy } from "../types";
import useUpdatePolicy from "./useUpdatePolicy";

const useUpdatePolicyForm = (chapterId: string, policyId: string) => {
  const { updatePolicy, isUpdating } = useUpdatePolicy();

  const submitForm = (values: EditPolicy) => {
    const formData = new FormData();
    formData.set("Name", values.newName);
    formData.set("Code", values.newCode);
    formData.set("MainFile", values.newMainFile!);
    formData.set("EstimatedTimeInMin", values.newEstimatedTimeInMin.toString());
    formData.set("Summary", values.newSummary);

    updatePolicy({ formData, chapterId, policyId });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isUpdating };
};

export default useUpdatePolicyForm;
