import PolicyIcon from "@mui/icons-material/AssuredWorkload";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { FC } from "react";
import formatDate from "src/utils/formatDate";
import { FinishedPolicy } from "../../API/types";

export interface PolicyProgressChunkProps {
  policy: FinishedPolicy;
}

const PolicyProgressChunk: FC<PolicyProgressChunkProps> = ({ policy }) => {
  const chapterName = policy.policy.chapter.name;

  const policyName = policy.policy.name;

  const lastAccessedDate = formatDate(policy.lastAccessed);

  return (
    <ListItemButton
      sx={{
        border: "1px solid lightGray",
        borderRadius: 4,
        maxWidth: 400,
        ":hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Stack width={"100%"}>
        <Stack direction="row" ml={0.5} alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 0.5 }}>
            <MenuBookIcon sx={{ fontSize: "1rem" }} />
          </ListItemIcon>
          <ListItemText secondary={chapterName} />
        </Stack>

        <Stack direction="row" alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
            <PolicyIcon sx={{ fontSize: "1.44rem" }} />
          </ListItemIcon>
          <ListItemText primary={policyName} />
        </Stack>

        <Chip
          label={lastAccessedDate}
          icon={<HistoryIcon sx={{ fontSize: "1.15rem" }} />}
          sx={{ height: "fit-content", py: 0.4, width: "fit-content", mt: 1 }}
        />
      </Stack>
    </ListItemButton>
  );
};

export default PolicyProgressChunk;
