import type { Meta, StoryObj } from "@storybook/react";

import Select from "./index";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: "option1",
    onChange: (value: string | string[]) => {
      alert(`Selected value: ${value}`);
    },
  },
};

export const Secondary: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: "option1",
    onChange: (value: string | string[]) => {
      alert(`Selected value: ${value}`);
    },
    variant: "secondary",
  },
};

export const Multiple: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: ["option1", "option2"],
    onChange: (value: string | string[]) => {
      alert(`Selected value: ${value}`);
    },
    multiple: true,
  },
};
