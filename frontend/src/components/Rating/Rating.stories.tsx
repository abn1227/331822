import type { Meta, StoryObj } from "@storybook/react";

import Rating from "./index";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Rating>;

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
