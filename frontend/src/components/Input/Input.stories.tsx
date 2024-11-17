import type { Meta, StoryObj } from "@storybook/react";

import Input from "./index";
import { User } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rightIcon: {
      control: "object",
      description: "Right icon to display",
      table: {
        type: {
          summary: "ReactNode",
        },
        defaultValue: {
          summary: "null",
        },
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

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

export const Accent: Story = {
  args: {
    variant: "accent",
    label: "Label",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    label: "Label",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    label: "Label",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    label: "Label",
  },
};

export const InputWithError: Story = {
  args: {
    variant: "error",
    label: "Label",
    error: "Error message",
  },
};

export const InputWithHelperText: Story = {
  args: {
    variant: "success",
    label: "Label",
    helperText: "Helper text",
  },
};

export const InputDisabled: Story = {
  args: {
    variant: "success",
    label: "Label",
    disabled: true,
  },
};

export const InputWithRightIcon: Story = {
  args: {
    variant: "success",
    label: "Label",
    rightIcon: <User />,
  },
};

// export const InputWithLeftIcon: Story = {
//   args: {
//     variant: "success",
//     label: "Label",
//     leftIcon: <User />,
//   },
// };
