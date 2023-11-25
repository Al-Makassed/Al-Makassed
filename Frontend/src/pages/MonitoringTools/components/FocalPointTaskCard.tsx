import React, { FC } from "react";
import { FocalPointTaskProps } from "../types";
import { Card, CardActions, Stack } from "@mui/material";
import { Typography, Button, Divider } from "@mui/material";
import MonitoringToolCardBody from "./MonitoringToolCardBody";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

const FocalPointTaskCard: FC<FocalPointTaskProps> = ({ focalPointTask }) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: { xs: 100, md: 330 },
          maxWidth: 345,
          minHeight: 230,
          borderRadius: "0 15px 0 10px",
        }}
      >
        <MonitoringToolCardBody
          monitoringTool={focalPointTask.monitoringTool}
          isFinished={focalPointTask.isFinished}
        />

        <Divider sx={{ mt: "auto", justifyContent: "flex-end" }} />

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button disabled={!!focalPointTask.isFinished} size="small">
            Add Submission
          </Button>

          {focalPointTask.isFinished && (
            <Stack flexDirection={"row"} alignItems={"center"} gap={0.4}>
              <CheckCircleIcon
                sx={{ color: "primary.main", fontSize: "1rem" }}
              />
              <Typography variant="body2">Done</Typography>
            </Stack>
          )}
        </CardActions>
      </Card>
    </Stack>
  );
};

export default FocalPointTaskCard;
