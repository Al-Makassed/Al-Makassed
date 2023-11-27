import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Card, CardActions, Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { FC } from "react";
import { FocalPointTaskProps } from "../types";
import CardBody from "./CardBody";

const FocalPointTaskCard: FC<FocalPointTaskProps> = ({ focalPointTask }) => {
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
      <CardBody
        monitoringTool={focalPointTask.monitoringTool}
        isFinished={focalPointTask.isFinished}
      />

      <Divider sx={{ justifyContent: "flex-end" }} />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={focalPointTask.isFinished}
          size="small"
          startIcon={<AddIcon />}
        >
          Add Submission
        </Button>

        {focalPointTask.isFinished && (
          <Chip
            label="Done"
            color="primary"
            icon={<CheckCircleIcon />}
            // clickable
          />
        )}
      </CardActions>
    </Card>
  );
};

export default FocalPointTaskCard;
