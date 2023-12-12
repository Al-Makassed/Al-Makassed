import React, { FC, useState } from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import { FieldsSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteMonitoringToolField from "../hooks/useDeleteMonitoringToolField";
import ConfirmDialog from "src/components/ConfirmDialog";
const FieldsSection: FC<FieldsSectionProps> = ({
  monitoringToolId,
  fields,
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const {
    state: { isEditingMode },
  } = useMonitoringToolDialogContext();

  const { removeMonitoringToolField } = useDeleteMonitoringToolField();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleDeleteButtonClicked = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteFieldFromMT = () =>
    removeMonitoringToolField({
      monitoringToolId,
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
                  border: isEditingMode ? 1.2 : 0,
                  mb: 1.5,
                  borderRadius: 2,
                  borderColor: (theme) => theme.palette.grey[300],
                }}
              >
                <ListItemIcon>
                  <FieldIcon />
                </ListItemIcon>
                <ListItemText primary={field.content} />
                {isEditingMode && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    sx={{ p: 0.5 }}
                    onClick={() => handleDeleteButtonClicked(field.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
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
    </>
  );
};

export default FieldsSection;
