import type { Meta, StoryObj } from "@storybook/react";

import Card from "./index";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Hello, world!",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Hello, world!",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Hello, world!",
  },
};
