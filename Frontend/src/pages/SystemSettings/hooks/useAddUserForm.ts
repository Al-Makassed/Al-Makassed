// import { useFormik } from "formik";
// // import validationSchema from "../schema";
// import { UserInitialValues } from "../constants";
// import { getUser } from "../API/type";
// import useAddUserAPI from "./useAddUserAPI";

// const useAddUserForm = () => {
//   const {  isPending, addNewUser } = useAddUserAPI();

//   const submitForm = (values: getUser) => {
//     addNewUser(values.content);
//   };

//   const formikProps = useFormik({
//     initialValues: UserInitialValues,
//     // validationSchema,
//     onSubmit: submitForm,
//   });

//   return { formikProps, isPending };
// };

// export default useAddUserForm;
