import { useFormik } from "formik";
import { fieldValidationSchema } from "../schema";
import { EditFieldFormValues } from "../types";
import useEditFieldAPI from "./useEditFieldAPI";
import { Field } from "../API/type";

const useEditFieldForm = (Field: Field) => {
  const { editField, isRenaming } = useEditFieldAPI();

  const submitForm = (values: EditFieldFormValues) => {
    editField({
      id: values.id,
      content: values.content,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: Field.id,
      content: Field.content,
    },
    validationSchema: fieldValidationSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
    isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditFieldForm;
