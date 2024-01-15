import { Stack } from "@mui/material";
import { FC } from "react";
import ContactingDetailsSection from "./ContactingDetailsSection";

interface SettingsCardProps {
  // user: User;
}

const SettingsCard: FC<SettingsCardProps> = () => {
  return (
    <Stack width={"100%"}>
      <ContactingDetailsSection />
    </Stack>
  );
};

export default SettingsCard;
