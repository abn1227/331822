import type { Meta, StoryObj } from "@storybook/react";

import Input from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
