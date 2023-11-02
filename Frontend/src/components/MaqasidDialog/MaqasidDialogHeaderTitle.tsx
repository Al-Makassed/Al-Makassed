import React, { FC, PropsWithChildren, ReactNode, ReactElement } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useDialogContext from "./context/useDialog";

interface MaqasidDialogHeaderTitleProps extends BoxProps {
  /** Dialog title */
  title?: string;
  /** Dialog subtitle */
  subtitle?: React.ReactNode;
  /* title className */
  titleClassName?: string;
  /* subtitle className */
  subtitleClassName?: string;
  showTitleTooltip?: boolean;
  showSubtitleTooltip?: boolean;
}

interface TitleWrapperProps {
  showTooltip: boolean;
  title: ReactNode;
  children: ReactElement;
}

const TitleWrapper: FC<TitleWrapperProps> = ({
  showTooltip,
  title,
  children,
}) =>
  showTooltip ? (
    <Tooltip disableInteractive title={title}>
      {children}
    </Tooltip>
  ) : (
    children
  );

const MaqasidDialogHeaderTitle: FC<
  PropsWithChildren<MaqasidDialogHeaderTitleProps>
> = ({
  title = "",
  subtitle = "",
  showTitleTooltip = false,
  showSubtitleTooltip = false,
  children,
  ...rest
}) => {
  const { isFullscreen } = useDialogContext();

  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pr: 2,
        minWidth: 0,
      }}
    >
      {title && (
        <TitleWrapper showTooltip={showTitleTooltip} title={title}>
          <Typography noWrap variant={isFullscreen ? "h5" : "h6"}>
            {title}
          </Typography>
        </TitleWrapper>
      )}
      {subtitle && (
        <TitleWrapper showTooltip={showSubtitleTooltip} title={subtitle}>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </TitleWrapper>
      )}
      {children}
    </Box>
  );
};

export default MaqasidDialogHeaderTitle;
