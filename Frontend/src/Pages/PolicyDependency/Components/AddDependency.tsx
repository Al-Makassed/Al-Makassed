import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import MultipleFileUpload from "./MultipleFileUpload";
// import { json } from 'stream/consumers'

const AddDependency = () => {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{ files: [] }} onSubmit={() => {}}>
          {/* {({ values, errors }) => { */}
          <Form>
            <Grid container spacing={2} direction="column">
              <MultipleFileUpload name="files" />
            </Grid>
            {/* <pre>{json.stringify({values,errors},null,4)}</pre> */}
          </Form>
          {/* }} */}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddDependency;
