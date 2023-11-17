import { Meta, StoryObj } from "@storybook/react";
import MaqasidDialog from "./MaqasidDialog";
import { Button, Chip, Stack, TextField, Typography } from "@mui/material";

const meta = {
  title: "Components/MaqasidDialog",
  component: MaqasidDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MaqasidDialog>;

export default meta;

type Story = StoryObj<typeof MaqasidDialog>;

/** This is the base light component */
export const ExampleDialog: Story = {
  render: ({
    isOpen,
    onClose,
    variant,
    disableBackdropClick,
    disableEscapeKeyDown,
    isFullscreen,
  }) => (
    <MaqasidDialog
      isOpen={isOpen}
      onClose={onClose}
      variant={variant}
      isFullscreen={isFullscreen}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
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
        isDirty={false}
        cancelProps={{
          label: "Cancel",
          onClick: () => {},
        }}
        closeAndDiscardProps={{
          label: "Discard",
          onClick: () => {},
        }}
        saveAndCloseProps={{
          label: "Save",
          onClick: () => {},
        }}
      />
    </MaqasidDialog>
  ),
};
