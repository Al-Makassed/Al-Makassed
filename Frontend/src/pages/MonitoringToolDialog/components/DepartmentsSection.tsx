import React, { FC, useState } from "react";
import { DepartmentsSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import { Box, Chip } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import useDeleteMonitoringToolDepartment from "../hooks/useDeleteMonitoringToolDepartmentRequest";
import ConfirmDialog from "src/components/ConfirmDialog";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { teal } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import AssignDepartmentDialog from "./AssignDepartmentDialog";

const DepartmentsSection: FC<DepartmentsSectionProps> = ({ departments }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const {
    state: { isEditingMode },
    onOpenAssignDepartmentsDialog,
  } = useMonitoringToolDialogContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const { unassignDepartment } = useDeleteMonitoringToolDepartment();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleDeleteButtonClicked = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setIsConfirmDialogOpen(true);
  };

  const handleUnassignDepartment = () =>
    unassignDepartment({
      monitoringToolId: selectedMonitoringTool!.id,
      departmentId: selectedDepartmentId!,
    });

  return (
    <>
      <SectionHeader title="Departments" />

      <Box flexDirection={"row"} width={"100 vw"} boxSizing={"border-box"}>
        {departments &&
          departments.map((department) =>
            isEditingMode ? (
              <Chip
                key={department.id}
                color={department.headId ? "primary" : "default"}
                label={department.name}
                icon={<BusinessIcon sx={{ fontSize: "1rem" }} />}
                sx={{ width: "fit-content", pl: 0.5, mb: 1, mr: 1 }}
                onDelete={() => handleDeleteButtonClicked(department.id)}
              />
            ) : (
              <Chip
                key={department.id}
                color={department.headId ? "primary" : "default"}
                label={department.name}
                icon={<BusinessIcon sx={{ fontSize: "1rem" }} />}
                sx={{ width: "fit-content", pl: 0.5, mb: 1, mr: 1 }}
              />
            ),
          )}
        {isEditingMode && (
          <Chip
            label={"Assign More Departments"}
            icon={<AddIcon sx={{ fontSize: "1.2rem" }} />}
            sx={{
              width: "fit-content",
              pl: 0.5,
              bgcolor: teal[50],
              border: 1,
              borderColor: "primary.main",
              mb: 1,
            }}
            onClick={onOpenAssignDepartmentsDialog}
          />
        )}
      </Box>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Unassign Monitoring Tool to Department"
        body="Are you sure you want to unassign this monitoring tool to this department?"
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
              handleUnassignDepartment();
            },
            color: "error",
          },
        ]}
      />

      <AssignDepartmentDialog />
    </>
  );
};

export default DepartmentsSection;
