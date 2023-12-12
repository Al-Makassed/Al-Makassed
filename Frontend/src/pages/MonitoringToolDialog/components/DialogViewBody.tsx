import React, { FC } from "react";
import DescriptionSection from "./DescriptionSection";
import FieldsSection from "./FieldsSection";
import DepartmentsSection from "./DepartmentsSection";
import { Stack } from "@mui/material";
import MaqasidDialog from "../../../components/MaqasidDialog";
import { DialogBodyAndFooterProps } from "../types";
import DatesChips from "./DatesChips";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import { FormikProvider } from "formik";
import SectionHeader from "./SectionHeader";
import TextField from "src/components/Fields/TextField";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";

const DialogBodyAndFooter: FC<DialogBodyAndFooterProps> = ({
  monitoringTool,
}) => {
  const {
    state: { isEditingMode },
    setIsEditingMode,
  } = useMonitoringToolDialogContext();

  const { onCloseMTViewDialog } = useMonitoringToolsContext();

  const { formikProps, isPending } =
    useUpdateMonitoringToolForm(monitoringTool);

  const { submitForm, dirty, isValid } = formikProps;

  const handleSubmitForm = () => submitForm();

  const handleDiscard = () => {
    onCloseMTViewDialog();
    setIsEditingMode(false);
  };

  const handleSave = () => {
    submitForm();
    onCloseMTViewDialog();
    setIsEditingMode(false);
  };

  return (
    <FormikProvider value={formikProps}>
      <MaqasidDialog.Body>
        <Stack gap={2}>
          <DatesChips
            createdAt={monitoringTool.createdAt}
            lastModified={monitoringTool.lastModified}
          />

          {isEditingMode ? (
            <Stack gap={3}>
              <Stack gap={2}>
                <SectionHeader title="Name" />
                <TextField name="name" />
              </Stack>

              <Stack gap={2}>
                <SectionHeader title="Description" />
                <TextField name="description" multiline />
              </Stack>
            </Stack>
          ) : (
            <DescriptionSection monitoringTool={monitoringTool} />
          )}

          <FieldsSection
            monitoringToolId={monitoringTool.id}
            fields={monitoringTool.fields}
          />

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
          //onClick: () => void{},
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
