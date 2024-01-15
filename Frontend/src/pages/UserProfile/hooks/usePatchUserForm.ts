import { useFormik } from "formik";
import { PatchDocument } from "../API/types";
import usePatchUser from "./usePatchUser ";

const usePatchUserForm = () => {
  const { partialEditUser, isUpdating } = usePatchUser();

  const submitForm = (values: Partial<PatchDocument>) => {
    partialEditUser({
      op: "replace",
      path: `/${values.path}`,
      value: `${values.value}`,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      op: "replace",
      path: "",
      value: "",
    },
    onSubmit: submitForm,
  });

  return { formikProps, isUpdating };
};

export default usePatchUserForm;
