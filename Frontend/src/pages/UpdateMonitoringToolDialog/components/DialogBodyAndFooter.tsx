import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { FormikProvider } from "formik";
import { FC } from "react";
import TextField from "src/components/Fields/TextField";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import MaqasidDialog from "../../../components/MaqasidDialog";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import { DialogBodyAndFooterProps } from "../types";
import DatesChips from "./DatesChips";
import DepartmentsSection from "./DepartmentsSection";
import FieldsSection from "./FieldsSection";
import SectionHeader from "./SectionHeader";

const DialogBodyAndFooter: FC<DialogBodyAndFooterProps> = ({
  monitoringTool,
}) => {
  const {
    state: { isEditingMode },
    onToggleEditMode,
  } = useUpdateMonitoringToolContext();

  const { onCloseDialog } = useMonitoringToolsContext();

  const { formikProps, isPending } =
    useUpdateMonitoringToolForm(monitoringTool);

  const { submitForm, dirty, isValid } = formikProps;

  const handleSubmitForm = () => submitForm();

  const handleDiscard = () => {
    onCloseDialog();
    onToggleEditMode();
  };

  const handleSave = () => {
    submitForm();
    onCloseDialog();
    onToggleEditMode();
  };

  return (
    <FormikProvider value={formikProps}>
      <MaqasidDialog.Body>
        <Stack gap={2}>
          <DatesChips
            createdAt={monitoringTool.createdAt}
            lastModified={monitoringTool.lastModified}
          />

          {/* Name Section */}
          {isEditingMode && (
            <Stack gap={2}>
              <SectionHeader title="Name" />
              <TextField name="name" />
            </Stack>
          )}

          {/* Description Section */}
          <>
            <SectionHeader title="Description" />
            {isEditingMode && <TextField name="description" multiline />}
            {!isEditingMode && (
              <Typography variant="body1" paragraph>
                {monitoringTool.description}
              </Typography>
            )}
          </>

          <FieldsSection fields={monitoringTool.fields} />

          <DepartmentsSection departments={monitoringTool.departments} />
        </Stack>
      </MaqasidDialog.Body>

      {isEditingMode && (
        <MaqasidDialog.Footer>
          <LoadingButton
            onClick={handleSubmitForm}
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
            aria-label="Add Field"
            loading={isPending}
            loadingPosition="start"
          >
            Submit
          </LoadingButton>
        </MaqasidDialog.Footer>
      )}

      <MaqasidDialog.SaveChangesConfirmationDialog
        isDirty={dirty}
        cancelProps={{
          label: "Cancel",
        }}
        closeAndDiscardProps={{
          label: "Discard",
          onClick: handleDiscard,
        }}
        saveAndCloseProps={{
          label: "Save",
          onClick: handleSave,
        }}
      />
    </FormikProvider>
  );
};

export default DialogBodyAndFooter;
