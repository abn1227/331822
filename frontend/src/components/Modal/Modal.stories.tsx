import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./index";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Modal Title",
    children: <div>Hello, world!</div>,
  },
};

export const Secondary: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      alert("Closed");
    },
    children: "Hello, world!",
    variant: "secondary",
  },
};

export const Accent: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: "Hello, world!",
    variant: "accent",
  },
};

export const Success: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: "Hello, world!",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: "Hello, world!",
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: "Hello, world!",
    variant: "warning",
  },
};

export const Transparent: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: "Hello, world!",
    variant: "transparent",
  },
};
