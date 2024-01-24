import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { FC, useState } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { DialogName } from "../constants";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useAddFieldToMonitoringTool from "../hooks/useAddFieldToMonitoringTool";
import useGetFields from "../hooks/useGetFields";
import { AppendFieldsDialogProps } from "../types";
import FieldsCheckboxList from "./FieldsCheckboxList";

const AppendFieldsDialog: FC<AppendFieldsDialogProps> = ({ existedFields }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    state: { openedDialog },
    onCloseDialog,
  } = useUpdateMonitoringToolContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const { fields: allFields } = useGetFields();

  const { appendFieldToMT, isAdding } = useAddFieldToMonitoringTool();

  // get the fields that are not already added to the monitoring tool.
  const selectableFields = allFields?.filter(
    (field) => !existedFields?.find((f) => f.id === field.id),
  );

  const handleCloseDialog = () => onCloseDialog();

  const handleToggle = (fieldId: string) => {
    const newSelectedItems = selectedItems.includes(fieldId)
      ? selectedItems.filter((id) => id !== fieldId)
      : [...selectedItems, fieldId];

    setSelectedItems(newSelectedItems);
  };

  const handleSubmit = () => {
    appendFieldToMT({
      monitoringToolId: selectedMonitoringTool!.id,
      fieldsIdes: selectedItems,
    });
    onCloseDialog();
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === DialogName.AppendField}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Append Field" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <MaqasidDialog.Body>
        <FieldsCheckboxList
          fields={selectableFields}
          selectedItems={selectedItems}
          onToggle={handleToggle}
        />
      </MaqasidDialog.Body>

      <MaqasidDialog.Footer>
        <LoadingButton
          onClick={handleSubmit}
          type="submit"
          disabled={selectedItems.length === 0}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          aria-label="Append Fields"
          loading={isAdding}
          loadingPosition="start"
        >
          Add
        </LoadingButton>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default AppendFieldsDialog;
