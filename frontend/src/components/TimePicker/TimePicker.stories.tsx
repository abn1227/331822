import type { Meta, StoryObj } from "@storybook/react";

import TimePicker from "./index";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Label",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Label",
  },
};
