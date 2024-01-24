import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HomeContainer } from "./styled";
import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import { Stack, TextField } from "@mui/material";

const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleChangeTextField = () => {
    setIsDirty(true);
  };

  const handleCancel = () => {
    console.log("cancel");
    setIsDirty(false);
  };

  const handleDiscard = () => {
    console.log("discard");
    setIsDirty(false);
  };

  const handleSave = () => {
    console.log("save");
    setIsDirty(false);
  };

  return (
    <HomeContainer>
      <Typography variant="h4">Welcome to Al-Maqasid</Typography>
      <Button onClick={handleClick}>Test Dialog</Button>

      <MaqasidDialog
        isOpen={isOpen}
        onClose={handleClose}
        variant="right"
        // isFullscreen
        // disableBackdropClick={true}
        // disableEscapeKeyDown={true}
      >
        <MaqasidDialog.Header>
          <MaqasidDialog.Title
            flex={1}
            title="Here goes the title"
            subtitle="This is a subtitle"
          />
          <MaqasidDialog.Actions>
            <Chip label="status" />
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body>
          <Stack gap={2}>
            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />

            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />

            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />

            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />

            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />

            <Typography variant="body1">
              Here goes the body, here goes the body, here goes the body, here
            </Typography>

            <TextField
              label="What dou you think?"
              variant="outlined"
              placeholder="e.g. I love this dialog component!"
              onChange={handleChangeTextField}
            />
          </Stack>
        </MaqasidDialog.Body>
        <MaqasidDialog.Footer>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
        </MaqasidDialog.Footer>
        <MaqasidDialog.SaveChangesConfirmationDialog
          isDirty={isDirty}
          cancelProps={{
            label: "Cancel",
            onClick: handleCancel,
          }}
          closeAndDiscardProps={{
            label: "Discard",
            onClick: handleDiscard,
          }}
          saveAndCloseProps={{
            label: "Save",
            onClick: handleSave,
          }}
        />
      </MaqasidDialog>
    </HomeContainer>
  );
};

export default Home;
