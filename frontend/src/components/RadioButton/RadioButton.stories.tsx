import type { Meta, StoryObj } from "@storybook/react";

import RadioButtons from "./index";

const meta: Meta<typeof RadioButtons> = {
  title: "Components/RadioButton",
  component: RadioButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RadioButtons>;

export const Primary: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: "option1",
    onChange: (value: string) => {
      alert(`Selected value: ${value}`);
    },
  },
};
