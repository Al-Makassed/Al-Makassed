import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Button,
  Card,
  CardActions,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import { FC } from "react";
import formatDate from "src/utils/formatDate";
import { MonitoringToolCardProps } from "../types";
import CardBody from "./CardBody";

const MonitoringToolCard: FC<MonitoringToolCardProps> = ({
  monitoringTool,
}) => {
  const lastModified = formatDate(monitoringTool.lastModified);

  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 230,
        // borderRadius: "0 15px 0 15px",
      }}
    >
      <CardBody monitoringTool={monitoringTool} />

      <Divider sx={{ justifyContent: "flex-end" }} />

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Tooltip title="Last modified" arrow>
          <Chip icon={<UpdateIcon />} label={lastModified} sx={{ mr: 1 }} />
        </Tooltip>

        <Button startIcon={<TroubleshootIcon />}>View</Button>
      </CardActions>
    </Card>
  );
};

export default MonitoringToolCard;
