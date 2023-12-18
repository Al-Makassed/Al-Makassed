import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { FC, useState } from "react";
import ConfirmDialog from "src/components/ConfirmDialog";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useDeleteMonitoringToolField from "../hooks/useDeleteMonitoringToolField";
import { FieldsSectionProps } from "../types";
import AppendFieldsDialog from "./AppendFieldsDialog";
import SectionHeader from "./SectionHeader";

const FieldsSection: FC<FieldsSectionProps> = ({ fields }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const {
    state: { isEditingMode },
    onOpenAppendFieldsDialog: onOpenAppendFieldDialog,
  } = useUpdateMonitoringToolContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const { removeMonitoringToolField } = useDeleteMonitoringToolField();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleDeleteButtonClicked = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteFieldFromMT = () =>
    removeMonitoringToolField({
      monitoringToolId: selectedMonitoringTool!.id,
      fieldId: selectedFieldId!,
    });

  return (
    <>
      <SectionHeader title="Fields" />

      <Grid item>
        <List>
          {fields &&
            fields.map((field) => (
              <ListItem
                key={field.id}
                sx={{
                  border: 1.2,
                  mb: 1.5,
                  borderRadius: 2,
                  borderColor: (theme) => theme.palette.grey[300],
                  spacing: 0,
                }}
              >
                <ListItemIcon sx={{ mr: 0, pr: 0, width: 3 }}>
                  <FieldIcon sx={{ width: 32 }} />
                </ListItemIcon>

                <ListItemText primary={field.content} />

                {isEditingMode && (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="error"
                    sx={{ p: 0.5 }}
                    onClick={() => handleDeleteButtonClicked(field.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          {isEditingMode && (
            <ListItemButton
              sx={{
                border: 1.2,
                borderRadius: 2,
                borderColor: "primary.main",
                bgcolor: teal[50],
              }}
              onClick={onOpenAppendFieldDialog}
            >
              <ListItemIcon>
                <AddIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Add More Fields" />
            </ListItemButton>
          )}
        </List>
      </Grid>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove Field From Monitoring Tool"
        body="Are you sure you want to remove this field from this monitoring tool?"
        onClose={closeConfirmDialog}
        actions={[
          {
            text: "Cancel",
            onClick: closeConfirmDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              closeConfirmDialog();
              handleDeleteFieldFromMT();
            },
            color: "error",
          },
        ]}
      />

      <AppendFieldsDialog />
    </>
  );
};

export default FieldsSection;
