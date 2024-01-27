import React, { FC, PropsWithChildren } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

interface MaqasidDialogHeaderProps {
  wrapContent?: boolean;
  bgColor?: string;
}

const MaqasidDialogHeader: FC<PropsWithChildren<MaqasidDialogHeaderProps>> = ({
  children,
  wrapContent = false,
  bgColor,
}) => {
  return (
    <DialogTitle
      sx={{
        py: 1,
        px: 3,
        background: bgColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: wrapContent ? "wrap" : "nowrap",
        }}
      >
        {children}
      </Box>
    </DialogTitle>
  );
};

export default MaqasidDialogHeader;
