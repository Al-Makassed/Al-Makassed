import React, { FC } from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MonitoringToolAdditionButton: FC = () => {
  return (
    <Tooltip title="Add Monitoring Tool" placement="top">
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: -60, right: 25 }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default MonitoringToolAdditionButton;
