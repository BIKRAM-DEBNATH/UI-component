"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, X, Loader2 } from "lucide-react"

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: "filled" | "outlined" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  clearable?: boolean
  onClear?: () => void
  type?: "text" | "password" | "email" | "number"
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type = "text",
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      variant = "outlined",
      size = "md",
      loading = false,
      clearable = false,
      onClear,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(value || "")
    const inputId = React.useId()

    const isControlled = value !== undefined
    const inputValue = isControlled ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("")
      }
      onClear?.()
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }

    const variantClasses = {
      filled: "bg-muted border-transparent focus:border-ring",
      outlined: "bg-background border-input focus:border-ring",
      ghost: "bg-transparent border-transparent focus:border-ring focus:bg-background",
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    const inputType = type === "password" && showPassword ? "text" : type

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("font-medium text-foreground", labelSizeClasses[size], disabled && "text-muted-foreground")}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "flex w-full rounded-md border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size],
              variantClasses[variant],
              invalid && "border-destructive focus:border-destructive",
              (type === "password" || clearable || loading) && "pr-10",
              className,
            )}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={invalid}
            aria-describedby={helperText || errorMessage ? `${inputId}-description` : undefined}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

            {!loading && clearable && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {!loading && type === "password" && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-description`}
            className={cn("text-xs", errorMessage ? "text-destructive" : "text-muted-foreground")}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  },
)

InputField.displayName = "InputField"

export { InputField }
