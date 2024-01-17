import PolicyIcon from "@mui/icons-material/AssuredWorkload";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { FC } from "react";
import { FinishedPolicy } from "../../API/types";

export interface PolicyProgressChunkProps {
  policy: FinishedPolicy;
}

const PolicyProgressChunk: FC<PolicyProgressChunkProps> = ({ policy }) => {
  const chapterName = policy.policy.chapter.name;
  const policyName = policy.policy.name;
  return (
    <ListItem
      sx={{
        border: "1px solid lightGray",
        borderRadius: 4,
        // width: "fit-content",
        maxWidth: 400,
        // pr:5
      }}
    >
      <Stack>
        <Stack direction="row" ml={0.5} alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 0.5 }}>
            <MenuBookIcon sx={{ fontSize: "1rem" }} />
          </ListItemIcon>
          <ListItemText secondary={chapterName} />
          {/* <Typography variant="subtitle2">{chapterName}</Typography> */}
        </Stack>

        <Stack direction="row" alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
            <PolicyIcon sx={{ fontSize: "1.44rem" }} />
          </ListItemIcon>
          <ListItemText primary={policyName} />
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default PolicyProgressChunk;
