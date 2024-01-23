import { useFormik } from "formik";
import validationSchema from "../schema";
import { EditPolicy, UpdatePolicyProps } from "../types";
import useUpdatePolicy from "./useUpdatePolicy";

const useUpdatePolicyForm = ({ chapterId, policy }: UpdatePolicyProps) => {
  const { updatePolicy, isUpdating, status } = useUpdatePolicy();

  const initialValues: EditPolicy = {
    newName: policy ? policy.name : "", // Provide a default value if policy is undefined
    newCode: policy ? policy.code : "",
    newEstimatedTimeInMin: policy ? parseInt(policy.estimatedTimeInMin, 10) : 0,
    newMainFile: undefined,
    newSummary: policy ? policy.summary : "",
  };

  const submitForm = (values: EditPolicy) => {
    const formData = new FormData();
    formData.set("Name", values.newName);
    formData.set("Code", values.newCode);
    formData.set("MainFile", values.newMainFile!);
    formData.set("EstimatedTimeInMin", values.newEstimatedTimeInMin.toString());
    formData.set("Summary", values.newSummary);

    updatePolicy({ formData, chapterId, policyId: policy.id });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
    isInitialValid: false,
  });

  return { formikProps, isUpdating, status };
};

export default useUpdatePolicyForm;
