import { CardContent, CardHeader, Typography } from "@mui/material";
import { FC } from "react";
import styles from "../style.module.css";
import { CardBodyProps } from "../types";
import { teal } from "@mui/material/colors";

const CardBody: FC<CardBodyProps> = ({ isFinished, monitoringTool }) => {
  if (!monitoringTool) return null;

  return (
    <>
      <CardHeader
        title={monitoringTool.name}
        sx={{
          bgcolor: isFinished ? "primary.light" : teal[50],
          color: isFinished ? "grey.100" : "",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.showFirstThreeLines}
        >
          {monitoringTool.description}
        </Typography>
      </CardContent>
    </>
  );
};

export default CardBody;
