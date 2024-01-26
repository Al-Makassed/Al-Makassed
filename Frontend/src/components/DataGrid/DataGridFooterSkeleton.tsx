import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, PropsWithChildren } from "react";
import theme from "src/style/maqasidTheme";
import { CreateDataGridConfig, FooterSkeletonProps } from "./types";

export function makeDataGridFooterSkeleton<T extends object>(
  configs: CreateDataGridConfig<T>,
) {
  const { pagination } = configs;

  const DataGridFooterSkeleton: PropsWithChildren<FooterSkeletonProps> = ({
    children,
    ...rest
  }) => (
    <Grid
      container
      {...rest}
      sx={{
        ...(pagination === "off" && { p: 1.5 }), // Hide footer if pagination is on top
        alignItems: "center",

        bgcolor: theme.palette.grey[100],
        position: "sticky",
        left: 0,
        bottom: 0,
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        justifyContent: "space-between",
        boxShadow: 2,
        ...rest.sx,
      }}
    >
      {children}
    </Grid>
  );

  const FooterStartCol: FC<BoxProps> = ({ children, ...rest }) => (
    <Box
      {...rest}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );

  const FooterEndCol: FC<BoxProps> = ({ children, ...rest }) => (
    <Box
      {...rest}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: 1,
        gap: 1,
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );

  DataGridFooterSkeleton.displayName = `${configs.name}.FooterSkeleton`;
  DataGridFooterSkeleton.Start = FooterStartCol;
  DataGridFooterSkeleton.Start.displayName = `${configs.name}.FooterSkeleton.Start`;
  DataGridFooterSkeleton.End = FooterEndCol;
  DataGridFooterSkeleton.End.displayName = `${configs.name}.FooterSkeleton.End`;

  return DataGridFooterSkeleton;
}
