import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HomeContainer } from "./styled";
import MaqasidDialog from "src/components/MaqasidDialog";

const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <HomeContainer>
      <Typography variant="h4">Welcome to Al-Maqasid</Typography>
      <Button onClick={handleClick}>Test Dialog</Button>
      <MaqasidDialog
        isOpen={isOpen}
        onClose={handleClose}
        // isFullscreen
        variant="right"
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
      >
        <MaqasidDialog.Header>
          <MaqasidDialog.Title
            flex={1}
            title="Paycheck Run"
            subtitle="This is a subtitle"
          />
          <MaqasidDialog.Actions>
            {/* <Chip label={paycheckRunStatus} />
            <PaycheckRunActions paycheckRunId={paycheckRunId} onCloseDialog={onClose} />
            <MaqasidDialog.Help formName="forms/paycheck-runs" /> */}
            <MaqasidDialog.Fullscreen
              onClick={() => console.log("FULLSCREEN CLICKED FROM HOME")}
            />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
      </MaqasidDialog>
    </HomeContainer>
  );
};

export default Home;
