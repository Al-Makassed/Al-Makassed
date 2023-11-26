import React, { FC, useEffect } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import TextField from "src/components/Fields/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import { FormikProvider, Form } from "formik";
import MaqasidDialog from "src/components/MaqasidDialog";
import useUpdatePolicyForm from "./hooks/useUpdatePolicyForm";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import { EditPolicyFormProps } from "./components/types";
import { TabPanelProps } from "./types";
import FormsList from "./components/FormsList";
import PostersList from "./components/PostersList";
import ProtocolsList from "./components/ProtocolsList";
// import useGetPolicy from "./hooks/useGetPolicy";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const EditPolicyAndDependenciesDialog: FC<EditPolicyFormProps> = ({
  open,
  chapterId,
  policyId,
  onClose,
}) => {
  // const { policy } = useGetPolicy({ chapterId, policyId });// pass this to initialValues

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
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Edit Policy" {...a11yProps(0)} />
                <Tab label="Edit Forms " {...a11yProps(1)} />
                <Tab label="Edit Posters " {...a11yProps(2)} />
                <Tab label="Edit Protocols " {...a11yProps(3)} />
                <MaqasidDialog.Actions>
                  {/* <MaqasidDialog.Fullscreen /> */}
                  <MaqasidDialog.Close />
                </MaqasidDialog.Actions>
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <MaqasidDialog.Header>
                <MaqasidDialog.Title title="Edit Policy" />
              </MaqasidDialog.Header>
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
              <MaqasidDialog.Header>
                <MaqasidDialog.Title title="Edit Forms" />
              </MaqasidDialog.Header>
              <MaqasidDialog.Body niceScroll>
                <FormsList />
              </MaqasidDialog.Body>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <MaqasidDialog.Header>
                <MaqasidDialog.Title title="Edit Posters" />
              </MaqasidDialog.Header>
              <MaqasidDialog.Body niceScroll>
                <PostersList />
              </MaqasidDialog.Body>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <MaqasidDialog.Header>
                <MaqasidDialog.Title title="Edit Protocols" />
              </MaqasidDialog.Header>
              <MaqasidDialog.Body niceScroll>
                <ProtocolsList />
              </MaqasidDialog.Body>
            </CustomTabPanel>
          </Box>
        </MaqasidDialog>
      </Form>
    </FormikProvider>
  );
};

export default EditPolicyAndDependenciesDialog;
