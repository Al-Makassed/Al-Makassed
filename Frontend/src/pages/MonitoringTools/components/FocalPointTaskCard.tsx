import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Card, CardActions, Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { FC } from "react";
import { FocalPointTaskProps } from "../types";
import CardBody from "./CardBody";
import { useNavigate } from "react-router-dom";

const FocalPointTaskCard: FC<FocalPointTaskProps> = ({ task }) => {
  const navigate = useNavigate();

  const handelAddSubmissionButtonClick = () => {
    navigate(`task/${task.id}`);
  };

  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 230,
      }}
    >
      <CardBody
        monitoringTool={task.monitoringTool}
        isFinished={task.isFinished}
      />

      <Divider sx={{ justifyContent: "flex-end" }} />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={task.isFinished}
          size="small"
          startIcon={<AddIcon />}
          onClick={handelAddSubmissionButtonClick}
        >
          Add Submission
        </Button>

        {task.isFinished && (
          <Chip label="Done" color="primary" icon={<CheckCircleIcon />} />
        )}
      </CardActions>
    </Card>
  );
};

export default FocalPointTaskCard;
