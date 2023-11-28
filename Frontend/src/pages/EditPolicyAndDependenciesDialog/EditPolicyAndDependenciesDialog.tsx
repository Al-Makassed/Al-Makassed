import React, { FC, useEffect } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import TextField from "src/components/Fields/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import { FormikProvider, Form } from "formik";
import MaqasidDialog from "src/components/MaqasidDialog";
import useUpdatePolicyForm from "./hooks/useUpdatePolicyForm";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import { EditPolicyFormProps } from "./components/types";
import FormsList from "./components/FormsList";
import PostersList from "./components/PostersList";
import ProtocolsList from "./components/ProtocolsList";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";

const EditPolicyAndDependenciesDialog: FC<EditPolicyFormProps> = ({
  open,
  chapterId,
  policyId,
  onClose,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { formikProps, isUpdating } = useUpdatePolicyForm(chapterId, policyId);

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  useEffect(() => {
    if (!isUpdating) {
      handleCloseDialog();
    }
  }, [isUpdating]);

  const handleCloseDialog = () => onClose();

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <MaqasidDialog
          isOpen={open}
          onClose={handleCloseDialog}
          onClosed={() => resetForm()}
          disableBackdropClick
          disableEscapeKeyDown
          variant="right"
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Edit Policy" padding={1} />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body niceScroll>
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Policy" {...a11yProps(0)} />
                  <Tab label="Forms " {...a11yProps(1)} />
                  <Tab label="Posters " {...a11yProps(2)} />
                  <Tab label="Protocols " {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <MaqasidDialog.Body niceScroll>
                  <FormikProvider value={formikProps}>
                    <Stack p={3} gap={2.5} justifyContent="center">
                      <TextField name="newName" label="Policy Name" />

                      <TextField name="newCode" label="Policy Code" />

                      <TextField
                        name="newEstimatedTimeInMin"
                        label="Time in minutes"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                      />

                      <FileDropzoneField name="newMainFile" />

                      <TextField name="newSummary" label="Summary" />
                    </Stack>
                  </FormikProvider>
                </MaqasidDialog.Body>
                <MaqasidDialog.Footer>
                  <LoadingButton
                    onClick={handleSubmitForm}
                    type="submit"
                    disabled={!dirty || !isValid}
                    variant="contained"
                    color="primary"
                    startIcon={<DriveFileRenameOutlineIcon />}
                    aria-label="Add policy"
                    loading={isUpdating}
                    loadingPosition="start"
                  >
                    Add
                  </LoadingButton>
                </MaqasidDialog.Footer>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <FormsList />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <PostersList />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <ProtocolsList />
              </CustomTabPanel>
            </Box>
          </MaqasidDialog.Body>
        </MaqasidDialog>
      </Form>
    </FormikProvider>
  );
};

export default EditPolicyAndDependenciesDialog;
