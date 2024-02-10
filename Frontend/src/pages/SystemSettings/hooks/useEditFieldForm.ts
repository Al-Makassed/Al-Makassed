import { useFormik } from "formik";
import { fieldValidationSchema } from "../schema";
import useEditFieldAPI from "./useEditFieldAPI";
import { EditFieldRequest, Field } from "../API/type";

const useEditFieldForm = (Field: Field) => {
  const { editField, isRenaming } = useEditFieldAPI();

  const submitForm = (values: EditFieldRequest) => {
    editField({
      id: values.id,
      content: values.content,
      categoryId: values.categoryId,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      id: Field.id,
      content: Field.content,
      categoryId: Field.category.id,
    },
    validationSchema: fieldValidationSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
    isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditFieldForm;
