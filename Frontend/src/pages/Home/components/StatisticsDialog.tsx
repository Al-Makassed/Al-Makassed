import { Stack } from "@mui/material";
import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import MaqasidDialog from "src/components/MaqasidDialog";
import StatisticsGrid from "./StatisticsGrid";

export interface AnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatisticsDialog: FC<AnnouncementDialogProps> = ({ isOpen, onClose }) => {
  const handleCloseDialog = () => onClose();

  return (
    <MaqasidDialog isOpen={isOpen} onClose={handleCloseDialog} variant="right">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Statistics" />

        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <MaqasidDialog.Body niceScroll noPadding>
        <Stack bgcolor={(theme) => theme.palette.grey[100]} height="100%">
          <StatisticsGrid />
        </Stack>
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default StatisticsDialog;
