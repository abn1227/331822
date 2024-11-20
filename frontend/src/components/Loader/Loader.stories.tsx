import type { Meta, StoryObj } from "@storybook/react";

import Loader from "./index";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "lg",
    fullScreen: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "lg",
    fullScreen: true,
  },
};
