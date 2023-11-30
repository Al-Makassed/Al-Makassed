import React, { FC } from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { MonitoringTool } from "../API/types";

const MonitoringToolDetailsView: FC<MonitoringTool> = () => {
  return (
    <Paper elevation={3} style={{ padding: "16px", maxWidth: "600px" }}>
      <Typography variant="h5" gutterBottom>
        {monitoringTool?.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Last Modified: {lastModified}
      </Typography>

      <Typography variant="body1" paragraph>
        {description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Fields
      </Typography>
      <List>
        {fields.map((field) => (
          <ListItem key={field.id}>
            <ListItemText primary={field.content} secondary={field.id} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Departments
      </Typography>
      <List>
        {departments.map((department) => (
          <ListItem key={department.id}>
            <ListItemText primary={department.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MonitoringToolDetailsView;
