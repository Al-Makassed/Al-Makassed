import PolicyIcon from "@mui/icons-material/AssuredWorkload";
import MtIcon from "@mui/icons-material/DvrOutlined";
import ChapterIcon from "@mui/icons-material/MenuBook";
import DependencyIcon from "@mui/icons-material/PictureAsPdf";
import TaskIcon from "@mui/icons-material/TaskOutlined";
import { FC } from "react";
import { SearchEntityType } from "../API/types";
import { EntityIconProps } from "../types";

const EntityIcon: FC<EntityIconProps> = ({ entityType }) => {
  switch (entityType) {
    case SearchEntityType.Chapter:
      return <ChapterIcon sx={{ fontSize: "1.2rem" }} />;

    case SearchEntityType.Policy:
      return <PolicyIcon sx={{ fontSize: "1.2rem" }} />;

    case SearchEntityType.Dependency:
      return <DependencyIcon sx={{ fontSize: "1.2rem" }} />;

    case SearchEntityType.MonitoringTool:
      return <MtIcon sx={{ fontSize: "1.2rem" }} />;

    case SearchEntityType.FocalPointTask:
      return <TaskIcon sx={{ fontSize: "1.2rem" }} />;

    default:
      return null;
  }
};

export default EntityIcon;
