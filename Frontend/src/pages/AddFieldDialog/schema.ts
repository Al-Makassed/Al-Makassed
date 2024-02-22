import * as Yup from "yup";
import { CreateFieldRequest } from "./API/types";

const validationSchema = Yup.object<CreateFieldRequest>().shape({
  content: Yup.string().required("Field content is required."),
  categoryId: Yup.string().required("Category is required."),
});

export default validationSchema;
