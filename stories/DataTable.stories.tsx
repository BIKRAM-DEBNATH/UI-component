"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin: string
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-19",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "Moderator",
    status: "inactive",
    joinDate: "2023-06-10",
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya@example.com",
    role: "User",
    status: "pending",
    joinDate: "2024-01-01",
    lastLogin: "Never",
  },
  {
    id: 5,
    name: "Vikram Gupta",
    email: "vikram@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-09-05",
    lastLogin: "2024-01-18",
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
  {
    key: "lastLogin",
    header: "Last Login",
    sortable: true,
    render: (value) => {
      if (value === "Never") return <span className="text-muted-foreground">Never</span>
      return new Date(value as string).toLocaleDateString()
    },
  },
]

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DataTable Component

A flexible and feature-rich data table component with sorting, selection, and customizable rendering.

## Features
- Column sorting with visual indicators
- Row selection (single/multiple)
- Loading and empty states
- Custom cell rendering
- Responsive design
- Full accessibility support
- TypeScript generic support

## Accessibility
- Proper table semantics
- Keyboard navigation
- Screen reader support
- ARIA labels for interactive elements
- Focus management

## Usage
The DataTable component is generic and works with any data type. Define your columns with the Column interface and pass your data array.

## Best Practices
- Always provide meaningful column headers
- Use custom renderers for complex data types
- Handle loading and empty states appropriately
- Keep row selection logic in parent component
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
}

export const WithSelection: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<User[]>([])

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users Table</h3>
          {selectedRows.length > 0 && <Badge variant="secondary">{selectedRows.length} selected</Badge>}
        </div>
        <DataTable {...args} selectable onRowSelect={setSelectedRows} />
        {selectedRows.length > 0 && (
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Selected Users:</h4>
            <ul className="space-y-1">
              {selectedRows.map((user) => (
                <li key={user.id} className="text-sm">
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  },
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
}

// States
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
}

// Custom Rendering
export const WithActions: Story = {
  render: () => {
    const columnsWithActions: Column<User>[] = [
      ...userColumns,
      {
        key: "id",
        header: "Actions",
        render: (_, row) => (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        ),
      },
    ]

    return <DataTable data={sampleUsers} columns={columnsWithActions} />
  },
}

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [users, setUsers] = useState(sampleUsers)
    const [selectedRows, setSelectedRows] = useState<User[]>([])
    const [loading, setLoading] = useState(false)

    const handleRefresh = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLoading(false)
    }

    const handleDeleteSelected = () => {
      const selectedIds = selectedRows.map((row) => row.id)
      setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)))
      setSelectedRows([])
    }

    const handleStatusToggle = (userId: number) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, status: user.status === "active" ? "inactive" : ("active" as User["status"]) }
            : user,
        ),
      )
    }

    const interactiveColumns: Column<User>[] = [
      ...userColumns.slice(0, -2), // Remove last two columns
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (value, row) => {
          const status = value as User["status"]
          return (
            <button onClick={() => handleStatusToggle(row.id)} className="text-left">
              <Badge
                variant={status === "active" ? "default" : "destructive"}
                className="cursor-pointer hover:opacity-80"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </button>
          )
        },
      },
      {
        key: "id",
        header: "Actions",
        render: (_, row) => (
          <Button size="sm" variant="outline" onClick={() => alert(`Editing ${row.name}`)}>
            Edit
          </Button>
        ),
      },
    ]

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Interactive Users Table</h3>
          <div className="flex space-x-2">
            <Button onClick={handleRefresh} disabled={loading}>
              Refresh
            </Button>
            {selectedRows.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected}>
                Delete Selected ({selectedRows.length})
              </Button>
            )}
          </div>
        </div>

        <DataTable
          data={users}
          columns={interactiveColumns}
          loading={loading}
          selectable
          onRowSelect={setSelectedRows}
          emptyMessage="No users available. Click refresh to reload."
        />

        <div className="text-sm text-muted-foreground">
          <p>• Click on status badges to toggle between active/inactive</p>
          <p>• Use checkboxes to select rows for bulk deletion</p>
          <p>• Click column headers to sort data</p>
        </div>
      </div>
    )
  },
}

// Different Data Types
interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics", inStock: true },
  { id: 2, name: "Book", price: 19.99, category: "Education", inStock: false },
  { id: 3, name: "Headphones", price: 199.99, category: "Electronics", inStock: true },
]

const productColumns: Column<Product>[] = [
  { key: "name", header: "Product Name", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: (value) => `$${(value as number).toFixed(2)}`,
  },
  { key: "category", header: "Category", sortable: true },
  {
    key: "inStock",
    header: "Stock Status",
    sortable: true,
    render: (value) => <Badge variant={value ? "default" : "destructive"}>{value ? "In Stock" : "Out of Stock"}</Badge>,
  },
]

export const ProductTable: Story = {
  args: {
    data: products,
    columns: productColumns,
  },
}
