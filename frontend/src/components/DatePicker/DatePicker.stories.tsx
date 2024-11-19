import type { Meta, StoryObj } from "@storybook/react";

import DatePicker from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

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
