"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { InputField } from "@/components/ui/input-field"
import { useState } from "react"

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with validation states, multiple variants, and optional features like password toggle and clear button.

## Features
- Multiple variants: filled, outlined, ghost
- Three sizes: small, medium, large
- Validation states with error messages
- Loading state with spinner
- Password toggle functionality
- Clear button option
- Full accessibility support
- Light and dark theme support

## Accessibility
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly
- Focus management
- High contrast support
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
  },
}

export default meta
type Story = StoryObj<typeof InputField>

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "Must be at least 3 characters long",
  },
}

// Variants
export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Filled Input",
    placeholder: "Type here...",
  },
}

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Outlined Input",
    placeholder: "Type here...",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost Input",
    placeholder: "Type here...",
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Input",
    placeholder: "Small size",
  },
}

export const Medium: Story = {
  args: {
    size: "md",
    label: "Medium Input",
    placeholder: "Medium size",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    placeholder: "Large size",
  },
}

// States
export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Please enter a valid email address",
    value: "invalid-email",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot type here",
    disabled: true,
    value: "Disabled value",
  },
}

export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Processing...",
    loading: true,
    value: "Loading content",
  },
}

// Special Features
export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    value: "secretpassword",
  },
}

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState("Clear me!")
    return (
      <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue("")} />
    )
  },
  args: {
    label: "Clearable Input",
    placeholder: "Type to see clear button",
    clearable: true,
  },
}

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
      }

      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-semibold">Registration Form</h3>
        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          invalid={!!errors.email}
          errorMessage={errors.email}
          clearable
          onClear={() => setFormData((prev) => ({ ...prev, email: "" }))}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          invalid={!!errors.password}
          errorMessage={errors.password}
          helperText="Must be at least 6 characters"
        />
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          invalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
        <button
          onClick={validateForm}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Validate Form
        </button>
      </div>
    )
  },
}
