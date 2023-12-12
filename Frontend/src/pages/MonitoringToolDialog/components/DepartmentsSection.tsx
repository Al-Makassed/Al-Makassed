import React, { FC } from "react";
import { DepartmentsSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import { Chip, Stack } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";

const DepartmentsSection: FC<DepartmentsSectionProps> = ({ departments }) => {
  const {
    state: { isEditingMode },
  } = useMonitoringToolDialogContext();

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
                onDelete={() => {}}
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
    </>
  );
};

export default DepartmentsSection;
