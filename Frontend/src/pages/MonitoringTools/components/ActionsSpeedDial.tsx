import MTAddIcon from "@mui/icons-material/LibraryAdd";
import FieldAddIcon from "@mui/icons-material/PostAdd";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { FC, useState } from "react";

const ACTIONS = [
  { icon: <MTAddIcon />, name: "MonitoringTool" },
  { icon: <FieldAddIcon />, name: "Field" },
];

const ActionsSpeedDial: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="MonitoringToolAdditionButton"
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
        {ACTIONS.map((action) => (
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

export default ActionsSpeedDial;
