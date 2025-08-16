"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  className?: string
  emptyMessage?: string
}

type SortDirection = "asc" | "desc" | null

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set())

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      let comparison = 0
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue
      } else {
        comparison = String(aValue).localeCompare(String(bValue))
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [data, sortColumn, sortDirection])

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return

    if (sortColumn === column.key) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortColumn(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortColumn(column.key)
      setSortDirection("asc")
    }
  }

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows)

    if (checked) {
      newSelectedRows.add(index)
    } else {
      newSelectedRows.delete(index)
    }

    setSelectedRows(newSelectedRows)

    const selectedData = Array.from(newSelectedRows).map((i) => sortedData[i])
    onRowSelect?.(selectedData)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(sortedData.map((_, index) => index))
      setSelectedRows(allIndices)
      onRowSelect?.(sortedData)
    } else {
      setSelectedRows(new Set())
      onRowSelect?.([])
    }
  }

  const isAllSelected = selectedRows.size === sortedData.length && sortedData.length > 0
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length

  if (loading) {
    return (
      <div className={cn("border rounded-md", className)}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={cn("border rounded-md", className)}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">{emptyMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {selectable && (
                <th className="w-12 p-4">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "text-left p-4 font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer hover:text-foreground transition-colors",
                    column.width && `w-[${column.width}]`,
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3 -mb-1",
                            sortColumn === column.key && sortDirection === "asc"
                              ? "text-foreground"
                              : "text-muted-foreground/50",
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3",
                            sortColumn === column.key && sortDirection === "desc"
                              ? "text-foreground"
                              : "text-muted-foreground/50",
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={cn("border-t hover:bg-muted/50 transition-colors", selectedRows.has(index) && "bg-muted/30")}
              >
                {selectable && (
                  <td className="p-4">
                    <Checkbox
                      checked={selectedRows.has(index)}
                      onCheckedChange={(checked) => handleRowSelect(index, checked as boolean)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-4">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { DataTable }
