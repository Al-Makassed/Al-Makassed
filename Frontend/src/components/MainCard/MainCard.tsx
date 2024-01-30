import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// project import
import { MainCardProps } from "./types";

// header style
const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref,
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        component="div"
        elevation={elevation || 0}
        ref={ref as any}
        {...others}
        sx={{
          border: border ? `1px solid ${theme.palette.grey[300]}` : "none",
          borderRadius: 2,
          borderColor: theme.palette.grey[300],
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark")
              ? shadow || theme.shadows[1]
              : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.shadows[1] : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "h6" }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  },
);

MainCard.displayName = "MainCard";

export default MainCard;
