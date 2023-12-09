import * as Yup from "yup";
import { Department } from "./API/type";

const validationSchema = Yup.object<Department>().shape({
  name: Yup.string().nullable().required("Policy name is required"),
});

export default validationSchema;
