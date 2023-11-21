import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { AddPolicyFormPayload } from "../types";
import useAddPolicyAPI from "./useAddPolicyAPI";

const useAddPolicyForm = (chapterId: string) => {
  const { addNewPolicy } = useAddPolicyAPI();

  const submitForm = (values: AddPolicyFormPayload) => {
    const formData = new FormData();
    formData.set("Name", values.Name);
    formData.set("Code", values.Code);
    formData.set("MainFile", values.MainFile!);
    formData.set("EstimatedTimeInMin", values.EstimatedTimeInMin.toString());
    formData.set("Summary", values.Summary);

    addNewPolicy({ formData, chapterId });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return formikProps;
};

export default useAddPolicyForm;
