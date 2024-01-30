import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { AnnouncementRequest } from "../API/types";
import useAddAnnouncementAPI from "./useAddAnnouncementAPI";

const useAddAnnouncementForm = () => {
  const { postAnnouncement, isAdding } = useAddAnnouncementAPI();

  const submitForm = (values: AnnouncementRequest) => {
    postAnnouncement({
      body: values.body,
      isPinned: values.isPinned,
    });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPosting: isAdding };
};

export default useAddAnnouncementForm;
