import React, { FC, useState } from "react";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import { AddPolicyProps } from "./types";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PolicyResponse } from "./API/types";
import useAddPolicyAPI from "./hooks/useAddPolicyAPI";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Policy name is required *"),
  estimatedTime: Yup.number()
    .max(60, "Too long*")
    .positive("must be a positive number")
    .integer(" must be an integer"),
});

const AddPolicy: FC<AddPolicyProps> = ({ onClose, open }) => {
  const { addNewPolicy } = useAddPolicyAPI();
  const closeDialog = () => onClose();
  const { id } = useParams();
  const [file, setFile] = useState(null);

  const initialValues: PolicyResponse = {
    name: "",
    estimatedTime: 0,
    file: "",
    chapterId: `${id}`,
  };
  //@ts-ignore
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = (values: PolicyResponse) => {
    // const fd = new FormData();

    // fd.append("pdfUrl", file as File);

    // const pdfFile = fd.get("pdfUrl") as string | Blob;

    addNewPolicy({
      name: values.name,
      //@ts-ignore
      file: file,
      estimatedTime: values.estimatedTime,
      chapterId: values.chapterId,
    });
    closeDialog();
    console.log(file);
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
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Stack p={3} gap={2.5} justifyContent="center">
              <Field type="text" name="name" placeholder="policyName" />
              <ErrorMessage name="name" component="div" />

              <Field
                type="number"
                name="estimatedTime"
                placeholder="Time in (min)"
              />
              <ErrorMessage name="estimatedTime" component="div" />

              {/* <Field type="file" name="pdfUrl" /> */}
              {/* <ErrorMessage name="file" component="div" /> */}
              <input type="file" name="file" onChange={handleFileChange} />

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
        )}
      </Formik>
      {/* <input type="file" name="pdfUrl" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event)} /> */}
    </Dialog>
  );
};

export default AddPolicy;
