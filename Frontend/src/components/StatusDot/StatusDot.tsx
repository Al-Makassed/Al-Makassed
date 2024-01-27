// material-ui
import { Box } from "@mui/material";

// project imports
import theme from "src/style/maqasidTheme";
import { Color, StatusDotProps } from "./types";

const colorsMap: Record<Color, string> = {
  secondary: theme.palette.secondary.light,
  error: theme.palette.error.light,
  warning: theme.palette.warning.light,
  info: theme.palette.info.light,
  success: theme.palette.success.light,
  primary: theme.palette.primary.light,
  "grey.500": theme.palette.grey[500],
};

const StatusDot = ({ color, size }: StatusDotProps) => {
  return (
    <Box
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: "50%",
        bgcolor: colorsMap[color ?? "grey.500"],
      }}
    />
  );
};

export default StatusDot;
