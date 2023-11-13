import React, { FC } from "react";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import { AddPolicyProps } from "./types";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PolicyResponse } from "./API/types";
import useAddPolicyAPI from "./hooks/useAddPolicyAPI";
import { useParams } from "react-router-dom";

const AddPolicy: FC<AddPolicyProps> = ({ onClose, open }) => {
  const { addNewPolicy } = useAddPolicyAPI();
  const closeDialog = () => onClose();
  const { id } = useParams();

  const initialValues: PolicyResponse = {
    name: "",
    estimatedTime: 0,
    pdfUrl: undefined,
    chapterId: `${id}`,
  };

  const onSubmit = (values: PolicyResponse) => {
    const fd = new FormData();

    fd.append("pdfUrl", values.pdfUrl as File);

    const pdfFile = fd.get("pdfUrl") as File | Blob;

    addNewPolicy({
      name: values.name,
      pdfUrl: pdfFile,
      estimatedTime: values.estimatedTime,
      chapterId: values.chapterId,
    });
    closeDialog();
    console.log(values);
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

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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

              <Field type="file" name="pdfUrl" />
              <ErrorMessage name="file" component="div" />

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
    </Dialog>
  );
};

export default AddPolicy;
