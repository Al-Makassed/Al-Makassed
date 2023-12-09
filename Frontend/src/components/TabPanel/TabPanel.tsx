import { Box } from "@mui/material";
import { FC } from "react";
import { TabPanelProps } from "./types";

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  if (value !== index) return null;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      <Box {...other}>{children}</Box>
    </div>
  );
};

export default TabPanel;
