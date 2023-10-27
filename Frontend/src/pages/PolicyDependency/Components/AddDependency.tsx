// import {FC} from 'react';
// import { Formik , Field} from 'formik';
// import { Button, Grid, Stack, Box, Select, MenuItem } from "@mui/material";
// import MultipleFileUpload from './MultipleFileUpload';

// export interface PROPS {
//   name: string;
// }

// const AddDependency:FC<PROPS> = ({name}) => (
//   <div>
//     <Formik
//       initialValues={{
//         files: [],
//         code: "",
//         estimatedTime: 0
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box >
//             <Box >
//               <MultipleFileUpload name="files" />
//             </Box>
//             <Stack mb={3} flexDirection="row" gap={5}>
//               <input
//                 type="text"
//                 name="code"
//                 placeholder={`${name} name`}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.code}
//               />
//               {errors.code && touched.code && errors.code}
//               <select
//                 // type="password"
//                 name="estimatedTime"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.estimatedTime}
//                 placeholder='0'

//               >
//                 {times.map((e, index) => (
//                   <option key={index} value={e.time} >{e.time}</option>
//                 ))}
//                </select>
//              <input type="number" />
//               {errors.estimatedTime && touched.estimatedTime && errors.estimatedTime}
//             </Stack>
//             <Stack alignItems='center' >
//               <Button variant="contained" type="submit" disabled={isSubmitting}>
//                 Submit
//               </Button>
//             </Stack>
//           </Box>
//         </form>
//       )}
//     </Formik>
//   </div >
// );

// export default AddDependency;

// const times = [
//   {
//     time: "5",
//   },

//   {
//     time: "10",
//   },

//   {
//     time: "15",
//   },

//   {
//     time: "20",
//   },

// ]
