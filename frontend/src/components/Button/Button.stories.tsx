import type { Meta, StoryObj } from "@storybook/react";

import { User } from "lucide-react";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Button",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Button",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Button",
  },
};

export const Icon: Story = {
  args: {
    icon: <User />,
    children: "Button",
  },
};
