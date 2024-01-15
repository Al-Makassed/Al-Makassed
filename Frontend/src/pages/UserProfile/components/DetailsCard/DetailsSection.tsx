import { Stack } from "@mui/material";
import { FC } from "react";
import { DetailsSectionProps } from "../../types";
import ContactingPart from "./ContactingPart";
import DepartmentPart from "./DepartmentPart";

const DetailsSection: FC<DetailsSectionProps> = ({ head }) => {
  return (
    <Stack gap={2} sx={{ transition: "all 0.3s ease" }}>
      <ContactingPart />
      <DepartmentPart head={head} />
    </Stack>
  );
};

export default DetailsSection;
