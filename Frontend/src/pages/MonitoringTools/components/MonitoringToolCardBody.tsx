import React, { FC } from "react";
import { CardContent, CardHeader, Typography } from "@mui/material";
import { MonitoringToolBodyCardProps } from "../types";
import styles from "../style.module.css";

const MonitoringToolCardBody: FC<MonitoringToolBodyCardProps> = ({
  monitoringTool,
  isFinished,
}) => {
  return (
    <>
      <CardHeader
        title={monitoringTool.name}
        sx={{
          bgcolor: isFinished
            ? "primary.main"
            : (theme) => theme.palette.grey[200],
          color: isFinished ? "#fafafa" : "",
        }}
      ></CardHeader>

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.textClamp}
        >
          {monitoringTool.description}
        </Typography>
      </CardContent>
    </>
  );
};

export default MonitoringToolCardBody;
