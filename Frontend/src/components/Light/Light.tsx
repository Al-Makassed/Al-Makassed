import React, { FC } from "react";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";

interface LightProps {
  /** The light's background color */
  variant?: "red" | "yellow" | "green";
}

const mapVariantToColor =
  (theme: Theme) => (variant: LightProps["variant"]) => {
    const VARIANT_TO_COLOR = {
      default: "grey.400",
      red: theme.palette.error.main,
      yellow: theme.palette.warning.light,
      green: theme.palette.success.light,
    };

    return VARIANT_TO_COLOR[variant ?? "default"];
  };

const Light: FC<LightProps> = ({ variant }) => {
  const theme = useTheme();

  const bgcolor = mapVariantToColor(theme)(variant);

  return (
    <Box
      sx={{
        bgcolor,
        borderRadius: "50%",
        width: 50,
        height: 50,
      }}
    />
  );
};

export default Light;
