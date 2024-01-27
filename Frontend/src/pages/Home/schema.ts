import * as Yup from "yup";
import { AnnouncementRequest } from "./API/types";

const validationSchema = Yup.object<AnnouncementRequest>().shape({
  body: Yup.string().nullable().required("Announcement body is required"),

  isPinned: Yup.boolean().required("Pinned is required"),
});

export default validationSchema;
