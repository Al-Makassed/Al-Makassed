import Yup from "yup";
import { CreateFieldRequest } from "./API/types";

const validationSchema = Yup.object<CreateFieldRequest>().shape({
  content: Yup.string().nullable().required("Field content is required"),
});

export default validationSchema;
