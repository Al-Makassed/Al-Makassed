import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  circularProgressClasses,
} from "@mui/material";
import { FC } from "react";
import { ProgressBarProps } from "./types";
import { getColor, round } from "./utils";

const ProgressBar: FC<ProgressBarProps> = ({
  percentage,
  type: label,
  ...props
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{ color: (theme) => theme.palette.grey[200] }}
        size={160}
        thickness={3.8}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: () => getColor(label),
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={160}
        thickness={3.8}
        value={percentage}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack alignItems={"center"}>
          <Typography variant="caption" component="div" color="text.secondary">
            {`${label} Files`}
          </Typography>
          <Typography variant="body1" component="div">
            {`${round(percentage)}%`}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProgressBar;
