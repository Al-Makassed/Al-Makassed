import { useFormik } from "formik";
import validationSchema from "../schema";
import { EditPolicy } from "../types";
import useUpdatePolicy from "./useUpdatePolicy";
import { Policy } from "../API/types";

interface UpdatePolicyProps {
  chapterId: string;
  policy: Policy;
}
const useUpdatePolicyForm = ({ chapterId, policy }: UpdatePolicyProps) => {
  const { updatePolicy, isUpdating, status } = useUpdatePolicy();

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
    initialValues: {
      newName: policy.name,
      newCode: policy.code,
      newEstimatedTimeInMin: parseInt(policy.estimatedTimeInMin, 10),
      newMainFile: undefined,
      newSummary: policy.summary,
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isUpdating, status };
};

export default useUpdatePolicyForm;
