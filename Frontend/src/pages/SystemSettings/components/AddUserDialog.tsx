// import AddIcon from "@mui/icons-material/Add";
// import { LoadingButton } from "@mui/lab";
// import { Stack } from "@mui/material";
// import { Form, FormikProvider } from "formik";
// import { FC, useEffect } from "react";
// // import TextField from "src/components/Fields/TextField";
// import MaqasidDialog from "src/components/MaqasidDialog";

// import { AddDepartmentDialogProps } from "../types";
// import useAddUserForm from "../hooks/useAddUserForm";
// import ImageDropzoneField from "src/components/Fields/ImageDropzoneField.tsx";

// const AddUserDialog: FC<AddDepartmentDialogProps> = ({ onClose, open }) => {
//   const { formikProps, isPending } = useAddUserForm();

//   const { dirty, isValid, resetForm, submitForm } = formikProps;

//   const handleSubmitForm = async () => {
//     await submitForm();
//     resetForm();
//   };

//   useEffect(() => {
//     if (!isPending) {
//       handleCloseDialog();
//     }
//   }, [isPending]);
//   const handleCloseDialog = () => onClose();

//   return (
//     <FormikProvider value={formikProps}>
//       <Form>
//         <MaqasidDialog
//           isOpen={open}
//           onClose={handleCloseDialog}
//           onClosed={() => resetForm()}
//           disableBackdropClick
//           disableEscapeKeyDown
//           // variant="right"
//         >
//           <MaqasidDialog.Header>
//             <MaqasidDialog.Title title="Add User" />
//             <MaqasidDialog.Actions>
//               <MaqasidDialog.Fullscreen />
//               <MaqasidDialog.Close />
//             </MaqasidDialog.Actions>
//           </MaqasidDialog.Header>
//           <MaqasidDialog.Body niceScroll>
//             <Stack p={3} gap={2.5} justifyContent="center">

//             <ImageDropzoneField name="Image" />

//             </Stack>
//           </MaqasidDialog.Body>
//           <MaqasidDialog.Footer>
//             <LoadingButton
//               onClick={handleSubmitForm}
//               type="submit"
//               disabled={!dirty || !isValid}
//               variant="contained"
//               color="primary"
//               startIcon={<AddIcon />}
//               aria-label="Add policy"
//               loading={isPending}
//               loadingPosition="start"
//             >
//               Add
//             </LoadingButton>
//           </MaqasidDialog.Footer>
//         </MaqasidDialog>
//       </Form>
//     </FormikProvider>
//   );
// };

// export default AddUserDialog;
