import React, { ChangeEvent, FC, useState } from "react";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import { AddPolicyProps } from "./types";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PolicyResponse } from "./API/types";
import useAddPolicyAPI from "./hooks/useAddPolicyAPI";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  Name: Yup.string().required("Policy name is required *"),
  EstimatedTimeInMin: Yup.number()
    .max(60, "Too long*")
    .positive("must be a positive number")
    .integer(" must be an integer"),
});

const AddPolicy: FC<AddPolicyProps> = ({ onClose, open, chapterId }) => {
  // const { chapterId: chapterIdParam } = useParams();
  // const chapterId = chapterIdParam ?? "";
  const { addNewPolicy } = useAddPolicyAPI();
  const closeDialog = () => onClose();
  // const { id } = useParams();
  const [file, setFile] = useState<File>();


  const initialValues: PolicyResponse = {
    Name: "",
    Code: "",
    EstimatedTimeInMin: 0,
    MainFile: undefined,
    Summary: "",
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (values: PolicyResponse) => {

    const formData = new FormData();
    formData.set("Name", values.Name);
    formData.set("Code", values.Code);
    formData.set("MainFile", file!);
    formData.set("EstimatedTimeInMin", values.EstimatedTimeInMin.toString());
    formData.set("Summary", values.Summary);
    addNewPolicy({ formData, chapterId });
    closeDialog();
  };

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          minWidth: 350,
          width: 450,
        },
      }}
      aria-labelledby="add-policy-dialog"
      onClose={closeDialog}
      open={open}
    >
      <DialogTitle
        variant="h5"
        sx={{
          fontWeight: "500",
        }}
      >
        Add Policy
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >

        <Form>
          <Stack p={3} gap={2.5} justifyContent="center">
            <Field type="text" name="Name" placeholder="policyName" />
            <ErrorMessage name="name" component="div" />

            <Field type="text" name="Code" placeholder="policyCode" />

            <Field
              type="number"
              name="EstimatedTimeInMin"
              placeholder="Time in (min)"
            />
            <ErrorMessage name="estimatedTime" component="div" />

            <input type="file" name="MainFile" onChange={handleFileChange} />

            <Field type="text" name="Summary" placeholder="summary" />

            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                type="submit"
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Form>

      </Formik>
    </Dialog>
  );
};

export default AddPolicy;
