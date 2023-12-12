import React, { FC, useState } from "react";
import { DepartmentsSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import { Chip, Stack } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import useDeleteMonitoringToolDepartment from "../hooks/useDeleteMonitoringToolDepartmentRequest";
import ConfirmDialog from "src/components/ConfirmDialog";

const DepartmentsSection: FC<DepartmentsSectionProps> = ({
  monitoringToolId,
  departments,
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const {
    state: { isEditingMode },
  } = useMonitoringToolDialogContext();

  const { unassignDepartment } = useDeleteMonitoringToolDepartment();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleDeleteButtonClicked = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setIsConfirmDialogOpen(true);
  };

  const handleUnassignDepartment = () =>
    unassignDepartment({
      monitoringToolId,
      departmentId: selectedDepartmentId!,
    });

  return (
    <>
      <SectionHeader title="Departments" />

      <Stack gap={1} flexDirection={"row"}>
        {departments &&
          departments.map((department) =>
            isEditingMode ? (
              <Chip
                key={department.id}
                color={department.headId ? "primary" : "default"}
                label={department.name}
                icon={<BusinessIcon sx={{ fontSize: "1rem" }} />}
                sx={{ width: "fit-content", pl: 0.5 }}
                onDelete={() => handleDeleteButtonClicked(department.id)}
              />
            ) : (
              <Chip
                key={department.id}
                color={department.headId ? "primary" : "default"}
                label={department.name}
                icon={<BusinessIcon sx={{ fontSize: "1rem" }} />}
                sx={{ width: "fit-content", pl: 0.5 }}
              />
            ),
          )}
      </Stack>

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
    </>
  );
};

export default DepartmentsSection;
