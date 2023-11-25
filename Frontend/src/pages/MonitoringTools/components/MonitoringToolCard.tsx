import React, { FC } from "react";
import { MonitoringToolCardProps } from "../types";
import { Card, CardActions, Stack } from "@mui/material";
import { Typography, Button, Divider } from "@mui/material";
import MonitoringToolCardBody from "./MonitoringToolCardBody";

const MonitoringToolCard: FC<MonitoringToolCardProps> = ({
  monitoringTool,
}) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: { xs: 300, md: 330 },
          maxWidth: 345,
          minHeight: 230,
          borderRadius: "0 15px 0 10px",
        }}
      >
        <MonitoringToolCardBody monitoringTool={monitoringTool} />

        <Divider sx={{ mt: "auto", justifyContent: "flex-end" }} />

        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            Last Modifies: {monitoringTool.lastModified.slice(0, 10)}
          </Typography>

          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default MonitoringToolCard;
