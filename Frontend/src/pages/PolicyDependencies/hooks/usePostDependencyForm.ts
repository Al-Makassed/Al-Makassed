import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { AddDependencyFormPayload } from "../types";
import usePostDependency from "./usePostDependency";

const usePostDependencyForm = (
  chapterId: string,
  policyId: string,
  type: number,
) => {
  const { addDependency, isAddingDependency } = usePostDependency();

  const submitForm = (values: AddDependencyFormPayload) => {
    const formData = new FormData();
    formData.set("Name", values.name);
    formData.set("Code", values.code);
    formData.set("File", values.mainFile!);
    formData.set("EstimatedTimeInMin", values.estimatedTime.toString());
    formData.set("Type", type.toString());

    addDependency({ formData, chapterId, policyId });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAddingDependency };
};

export default usePostDependencyForm;
