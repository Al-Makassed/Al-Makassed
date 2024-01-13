import { Stack } from "@mui/material";
import { FC } from "react";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import MaqasidDialog from "../../../components/MaqasidDialog";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import { DialogBodyAndFooterProps } from "../types";
import DatesChips from "./DatesChips";
import DepartmentsSection from "./DepartmentsSection";
import FieldsSection from "./FieldsSection";
import NameAndDescriptionSections from "./NameAndDescriptionSections";

const DialogBodyAndFooter: FC<DialogBodyAndFooterProps> = ({
  monitoringTool,
}) => {
  const { onToggleEditMode } = useUpdateMonitoringToolContext();

  const { onCloseDialog } = useMonitoringToolsContext();

  const { formikProps } = useUpdateMonitoringToolForm(monitoringTool);

  const { submitForm, dirty } = formikProps;

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
    <>
      <MaqasidDialog.Body>
        <Stack gap={2}>
          <DatesChips
            createdAt={monitoringTool.createdAt}
            lastModified={monitoringTool.lastModified}
          />

          <NameAndDescriptionSections monitoringTool={monitoringTool} />

          <FieldsSection fields={monitoringTool.fields} />

          <DepartmentsSection departments={monitoringTool.departments} />
        </Stack>
      </MaqasidDialog.Body>

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
    </>
  );
};

export default DialogBodyAndFooter;
