import { useFormik } from "formik";
// import validationSchema from "../schema";
import { EditFieldFormValues } from "../types";
import useEditFieldAPI from "./useEditFieldAPI";
import { Field } from "../API/type";

const useEditFieldForm = (Field: Field) => {
  const { editField, isRenaming } = useEditFieldAPI(Field.id);

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
    // validationSchema,
    onSubmit: submitForm,
    // enableReinitialize: true,
    // isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useEditFieldForm;
