import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import TextField from "src/components/Fields/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import { FormikProvider } from "formik";
import MaqasidDialog from "src/components/MaqasidDialog";
import useUpdatePolicyForm from "./hooks/useUpdatePolicyForm";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import FormsList from "./components/FormsList";
import PostersList from "./components/PostersList";
import ProtocolsList from "./components/ProtocolsList";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";
import useGetPolicy from "./hooks/useGetPolicy";
import { useNavigate, useParams } from "react-router-dom";

const EditPolicyAndDependenciesDialog: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [value, setValue] = useState(0);

  const { chapterId: chapterIdParam } = useParams();

  const { policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const navigateToPolicyDetails = () =>
    navigate(`/me/chapters/${chapterId}/policies/${policyId}`);

  const { policy } = useGetPolicy({ chapterId, policyId });

  if (!policy) return null;

  const { formikProps, isUpdating, status } = useUpdatePolicyForm({
    chapterId,
    policy,
  });
  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  useEffect(() => {
    if (!isUpdating && status == "success") {
      closeMainDialog();
    }
  }, [isUpdating, status]);

  const closeMainDialog = () => setIsOpen(false);

  return (
    <>
      <MaqasidDialog
        isOpen={isOpen}
        onClose={closeMainDialog}
        onClosed={navigateToPolicyDetails}
        // disableBackdropClick
        // disableEscapeKeyDown
        variant="right"
      >
        <MaqasidDialog.Header>
          <MaqasidDialog.Title title="Edit Policy" />
          <MaqasidDialog.Actions>
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body niceScroll>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
            <FormikProvider value={formikProps}>
              <Stack gap={2.5} justifyContent="center">
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
                <LoadingButton
                  fullWidth
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
                  Update
                </LoadingButton>
              </Stack>
            </FormikProvider>
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
        </MaqasidDialog.Body>
      </MaqasidDialog>
    </>
  );
};

export default EditPolicyAndDependenciesDialog;
