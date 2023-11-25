import React, { FC } from "react";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import FieldAddIcon from "@mui/icons-material/PostAdd";
import MTAddIcon from "@mui/icons-material/LibraryAdd";

const actions = [
  { icon: <MTAddIcon />, name: "MonitoringTool" },
  { icon: <FieldAddIcon />, name: "Field" },
];

const MonitoringToolAdditionButton: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel=""
        sx={{
          position: "absolute",
          bottom: { xs: -70, md: -16 },
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default MonitoringToolAdditionButton;
