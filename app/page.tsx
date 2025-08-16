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
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">React Component Showcase</h1>
        <p className="text-muted-foreground text-lg">
          InputField and DataTable components with TypeScript and Tailwind CSS
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* InputField Demo */}
        <Card>
          <CardHeader>
            <CardTitle>InputField Component</CardTitle>
            <CardDescription>Flexible input component with validation, variants, and special features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <Button onClick={handleSubmit} className="w-full">
              Validate Form
            </Button>
          </CardContent>
        </Card>

        {/* Size and Variant Examples */}
        <Card>
          <CardHeader>
            <CardTitle>InputField Variants & Sizes</CardTitle>
            <CardDescription>Different styles and sizes available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField size="sm" variant="ghost" placeholder="Small ghost input" label="Small Size" />

            <InputField size="md" variant="filled" placeholder="Medium filled input" label="Medium Size" />

            <InputField size="lg" variant="outlined" placeholder="Large outlined input" label="Large Size" />

            <InputField placeholder="Disabled state" label="Disabled Input" disabled value="Cannot edit this" />

            <InputField placeholder="Loading state" label="Loading Input" loading value="Processing..." />
          </CardContent>
        </Card>
      </div>

      {/* DataTable Demo */}
      <Card>
        <CardHeader>
          <CardTitle>DataTable Component</CardTitle>
          <CardDescription>Feature-rich data table with sorting, selection, and custom rendering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedUsers.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                <span className="font-medium">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
                <Button variant="destructive" size="sm" onClick={() => setSelectedUsers([])}>
                  Clear Selection
                </Button>
              </div>
            )}

            <DataTable data={sampleUsers} columns={userColumns} selectable onRowSelect={setSelectedUsers} />

            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Click column headers to sort data</p>
              <p>• Use checkboxes to select rows</p>
              <p>• Custom rendering for badges and dates</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Component Features</CardTitle>
          <CardDescription>Summary of implemented features and capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">InputField Features</h3>
              <ul className="space-y-1 text-sm">
                <li>✅ Multiple variants (filled, outlined, ghost)</li>
                <li>✅ Three sizes (small, medium, large)</li>
                <li>✅ Validation states with error messages</li>
                <li>✅ Loading state with spinner</li>
                <li>✅ Password toggle functionality</li>
                <li>✅ Clear button option</li>
                <li>✅ Full accessibility support</li>
                <li>✅ TypeScript interface</li>
                <li>✅ Light and dark theme support</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">DataTable Features</h3>
              <ul className="space-y-1 text-sm">
                <li>✅ Column sorting with indicators</li>
                <li>✅ Row selection (single/multiple)</li>
                <li>✅ Loading and empty states</li>
                <li>✅ Custom cell rendering</li>
                <li>✅ Generic TypeScript support</li>
                <li>✅ Responsive design</li>
                <li>✅ Accessibility features</li>
                <li>✅ Keyboard navigation</li>
                <li>✅ Customizable styling</li>
              </ul>
            </div>
          </div>

          {/* Attribution Footer */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">Made by Bikram</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
