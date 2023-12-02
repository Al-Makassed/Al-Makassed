import * as Yup from "yup";
import { EditChapterFormValues } from "./types";

const validationSchema = Yup.object<EditChapterFormValues>().shape({
  newChapterName: Yup.string().nullable().required("Chapter name is required"),
});

export default validationSchema;
