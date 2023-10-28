import * as Yup from "yup";

const ChapterSchema = Yup.object().shape({
  chapterName: Yup.string().min(5, "Too Short!").required("Required"),
});
export default ChapterSchema;
