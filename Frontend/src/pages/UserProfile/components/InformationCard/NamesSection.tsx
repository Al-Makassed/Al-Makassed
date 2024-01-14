import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface NamesSectionProps {
  fullName: string;
  userName: string;
}

const NamesSection: FC<NamesSectionProps> = ({ fullName, userName }) => {
  return (
    <Stack alignItems={{ xs: "center", sm: "start" }} mb={0.65}>
      <Typography variant="h5">{fullName}</Typography>

      <Typography variant="body2" color="textSecondary">
        {`@${userName}`}
      </Typography>
    </Stack>
  );
};

export default NamesSection;
