import { Meta, StoryObj } from "@storybook/react";
import Light from "./Light";
import Stack from "@mui/material/Stack";

const meta = {
  title: "Example/Light",
  component: Light,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Light>;

export default meta;

type Story = StoryObj<typeof Light>;

/** This is the base light component */
export const Base: Story = {
  args: {
    variant: undefined,
  },
};

/** This means Stop! */
export const Red: Story = {
  args: {
    variant: "red",
  },
};

/** Get ready.. */
export const Yellow: Story = {
  args: {
    variant: "yellow",
  },
};

/** Go! */
export const Green: Story = {
  args: {
    variant: "green",
  },
};

/** This is a traffic light component */
export const Grouped: Story = {
  args: {
    variant: "yellow",
  },
  render: () => (
    <Stack
      gap={1}
      sx={{
        border: (theme) => `4px solid ${theme.palette.grey[400]}`,
        width: "max-content",
        p: 1,
      }}
    >
      <Light variant="red" />
      <Light variant="yellow" />
      <Light variant="green" />
    </Stack>
  ),
};
