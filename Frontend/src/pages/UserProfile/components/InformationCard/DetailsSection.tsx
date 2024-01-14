import BadgeIcon from "@mui/icons-material/Badge";
import DepartmentIcon from "@mui/icons-material/BusinessRounded";
import HistoryIcon from "@mui/icons-material/History";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface DetailsSectionProps {
  userId: string;
  departmentName: string;
  createdAtDate: string;
}

const DetailsSection: FC<DetailsSectionProps> = ({
  userId,
  departmentName,
  createdAtDate,
}) => {
  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <BadgeIcon
          sx={{
            color: (theme) => theme.palette.grey[500],
            fontSize: "1.3rem",
          }}
        />
        <Typography variant="body2" color="textSecondary">
          {userId}
        </Typography>
      </Stack>

      {/* department */}
      <Stack direction="row" alignItems="center" gap={1}>
        <DepartmentIcon
          sx={{
            color: (theme) => theme.palette.grey[500],
            fontSize: "1.3rem",
          }}
        />
        <Typography variant="body2" color="textSecondary">
          {departmentName}
        </Typography>
      </Stack>

      {/* created at */}
      <Stack direction="row" alignItems="center" gap={1}>
        <HistoryIcon
          sx={{
            color: (theme) => theme.palette.grey[500],
            fontSize: "1.3rem",
          }}
        />
        <Typography variant="body2" color="textSecondary">
          {createdAtDate}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DetailsSection;
