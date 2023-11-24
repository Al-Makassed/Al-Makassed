import * as Yup from "yup";
import { NewChapterName } from "./types";

const validationSchema = Yup.object<NewChapterName>().shape({
  newChapterName: Yup.string().nullable().required("Chapter name is required"),
});

export default validationSchema;
