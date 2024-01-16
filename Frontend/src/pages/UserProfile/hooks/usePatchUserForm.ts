import { useFormik } from "formik";
import usePatchUser from "./usePatchUser ";
import { validationSchema } from "../schema";
import { EditFormValues } from "../types";

const usePatchUserForm = (email: string, phoneNumber: string) => {
  const { partialEditUser, isUpdating } = usePatchUser();

  const submitForm = (values: EditFormValues) => {
    partialEditUser([
      {
        op: "replace",
        path: `/${
          values.phoneNumber !== phoneNumber ? "phoneNumber" : "email"
        }`,
        value: `${
          values.phoneNumber !== phoneNumber ? values.phoneNumber : values.email
        }`,
      },
    ]);
  };

  const formikProps = useFormik({
    initialValues: {
      phoneNumber,
      email,
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isUpdating };
};

export default usePatchUserForm;
