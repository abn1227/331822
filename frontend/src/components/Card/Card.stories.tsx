import type { Meta, StoryObj } from "@storybook/react";

import Card from "./index";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Components/Card",
  tags: ["autodocs"],
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

export const Success: Story = {
  args: {
    variant: "success",
    children: "Hello, world!",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Hello, world!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Hello, world!",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "Hello, world!",
  },
};
