import React, { FC } from "react";
import { DepartmentsSectionProps } from "./types";
import SectionHeader from "./SectionHeader";
import { Chip, Stack } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const DepartmentsSection: FC<DepartmentsSectionProps> = ({ departments }) => {
  return (
    <>
      <SectionHeader title="Departments" />

      <Stack gap={1} flexDirection={"row"}>
        {departments &&
          departments.map((department) => (
            <Chip
              key={department.id}
              color={department.headId ? "primary" : "default"}
              label={department.name}
              icon={<BusinessIcon sx={{ fontSize: "1rem" }} />}
              sx={{ width: "fit-content", pl: 0.5 }}
            />
          ))}
      </Stack>
    </>
  );
};

export default DepartmentsSection;
