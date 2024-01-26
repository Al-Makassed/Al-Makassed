import PolicyIcon from "@mui/icons-material/AssuredWorkload";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RightArrowIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import DependencyIcon from "@mui/icons-material/DescriptionRounded";
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { formatDate } from "src/utils";
import { DependencyChunkProps } from "./types";

const DependencyChunk: FC<DependencyChunkProps> = ({ finishedFile }) => {
  const {
    lastAccessed,
    dependency: {
      pdfUrl,
      name,
      policy: {
        name: policyName,
        chapter: { name: chapterName },
      },
    },
  } = finishedFile;

  const lastAccessedDate = formatDate(lastAccessed);

  const handleClick = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <ListItemButton
      sx={{
        border: "1px solid lightGray",
        borderRadius: 4,
        maxWidth: 400,
        mb: 1.4,
        ":hover": {
          borderColor: "primary.main",
        },
      }}
      onClick={handleClick}
    >
      <Stack width={"100%"}>
        <Stack direction="row" ml={0.5} alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 0.5 }}>
            <MenuBookIcon sx={{ fontSize: "1rem" }} />
          </ListItemIcon>
          <ListItemText secondary={chapterName} />
        </Stack>

        <Stack direction="row" alignItems="center">
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 1, ml: 0.75 }}>
            <Stack direction="row" alignItems="center">
              <RightArrowIcon /> <PolicyIcon sx={{ fontSize: "1rem" }} />
            </Stack>
          </ListItemIcon>
          <ListItemText secondary={policyName} />
        </Stack>

        <Stack direction="row" alignItems="center" my={0.75}>
          <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
            <DependencyIcon sx={{ fontSize: "1.44rem" }} />
          </ListItemIcon>
          <ListItemText primary={name} />
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

export default DependencyChunk;
