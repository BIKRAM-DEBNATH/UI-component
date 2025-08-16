"use client"

import { InputField } from "@/components/ui/input-field"
import { DataTable, type Column } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joinDate: string
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-03-22",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "Moderator",
    status: "inactive",
    joinDate: "2023-06-10",
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya@example.com",
    role: "User",
    status: "pending",
    joinDate: "2024-01-01",
  },
]

const userColumns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    render: (value) => <Badge variant={value === "Admin" ? "default" : "secondary"}>{value as string}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value) => {
      const status = value as User["status"]
      const variants = {
        active: "default",
        inactive: "destructive",
        pending: "secondary",
      } as const

      return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    },
  },
  {
    key: "joinDate",
    header: "Join Date",
    sortable: true,
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
]

export default function ComponentShowcase() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form is valid!")
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
          React Component Showcase
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          InputField and DataTable components with TypeScript and Tailwind CSS
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* InputField Demo */}
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-in-left">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              InputField Component
            </CardTitle>
            <CardDescription>Flexible input component with validation, variants, and special features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                invalid={!!errors.name}
                errorMessage={errors.name}
                clearable
                onClear={() => setFormData((prev) => ({ ...prev, name: "" }))}
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                invalid={!!errors.email}
                errorMessage={errors.email}
                variant="filled"
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                invalid={!!errors.password}
                errorMessage={errors.password}
                helperText="Must be at least 6 characters"
                variant="outlined"
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button
                onClick={handleSubmit}
                className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Validate Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Size and Variant Examples */}
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-in-right">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              InputField Variants & Sizes
            </CardTitle>
            <CardDescription>Different styles and sizes available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <InputField size="sm" variant="ghost" placeholder="Small ghost input" label="Small Size" />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <InputField size="md" variant="filled" placeholder="Medium filled input" label="Medium Size" />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <InputField size="lg" variant="outlined" placeholder="Large outlined input" label="Large Size" />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <InputField placeholder="Disabled state" label="Disabled Input" disabled value="Cannot edit this" />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <InputField placeholder="Loading state" label="Loading Input" loading value="Processing..." />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DataTable Demo */}
      <Card
        className="transform transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            DataTable Component
          </CardTitle>
          <CardDescription>Feature-rich data table with sorting, selection, and custom rendering</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {selectedUsers.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border-l-4 border-blue-500 animate-slide-in-down">
                <span className="font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setSelectedUsers([])}
                  className="transition-all duration-300 hover:scale-105"
                >
                  Clear Selection
                </Button>
              </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <DataTable data={sampleUsers} columns={userColumns} selectable onRowSelect={setSelectedUsers} />
            </div>

            <div
              className="text-sm text-muted-foreground space-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                Click column headers to sort data
              </p>
              <p className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                Use checkboxes to select rows
              </p>
              <p className="flex items-center gap-2">
                <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                Custom rendering for badges and dates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Summary */}
      <Card
        className="transform transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
        style={{ animationDelay: "0.8s" }}
      >
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            Component Features
          </CardTitle>
          <CardDescription>Summary of implemented features and capabilities</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                InputField Features
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Multiple variants (filled, outlined, ghost)",
                  "Three sizes (small, medium, large)",
                  "Validation states with error messages",
                  "Loading state with spinner",
                  "Password toggle functionality",
                  "Clear button option",
                  "Full accessibility support",
                  "TypeScript interface",
                  "Light and dark theme support",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 animate-fade-in-right"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-green-500 rounded-full"></div>
                DataTable Features
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Column sorting with indicators",
                  "Row selection (single/multiple)",
                  "Loading and empty states",
                  "Custom cell rendering",
                  "Generic TypeScript support",
                  "Responsive design",
                  "Accessibility features",
                  "Keyboard navigation",
                  "Customizable styling",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 animate-fade-in-left"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Attribution Footer */}
          <div className="mt-8 pt-6 border-t text-center animate-fade-in-up" style={{ animationDelay: "1s" }}>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              Made by Bikram
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
