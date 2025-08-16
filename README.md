# React Component Development Assignment

A comprehensive implementation of two React components (InputField and DataTable) built with React, TypeScript, and Tailwind CSS, complete with Storybook documentation.

## 🚀 Components

### InputField Component
A flexible and accessible input component with comprehensive features:

- **Variants**: filled, outlined, ghost
- **Sizes**: small, medium, large  
- **States**: disabled, invalid, loading
- **Features**: password toggle, clear button, validation
- **Accessibility**: Full ARIA support, keyboard navigation
- **Theming**: Light and dark mode support

### DataTable Component
A feature-rich data table with advanced functionality:

- **Sorting**: Column-based sorting with visual indicators
- **Selection**: Single and multiple row selection
- **States**: Loading and empty state handling
- **Customization**: Custom cell rendering, flexible columns
- **Accessibility**: Proper table semantics, keyboard navigation
- **TypeScript**: Generic type support for any data structure

## 🛠️ Tech Stack

- **React 18** with hooks and modern patterns
- **TypeScript** for type safety and better DX
- **Tailwind CSS** for styling and responsive design
- **Next.js** as the React framework
- **Storybook** for component documentation
- **Lucide React** for icons

## 📁 Project Structure

\`\`\`
├── components/
│   └── ui/
│       ├── input-field.tsx     # InputField component
│       ├── data-table.tsx      # DataTable component
│       └── ...                 # Other UI components
├── stories/
│   ├── InputField.stories.tsx  # InputField Storybook stories
│   └── DataTable.stories.tsx   # DataTable Storybook stories
├── app/
│   ├── page.tsx               # Demo page showcasing components
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
└── .storybook/                # Storybook configuration
\`\`\`

## 🎨 Features Implemented

### InputField
- ✅ Text input with label, placeholder, helper text, error message
- ✅ States: disabled, invalid, loading
- ✅ Variants: filled, outlined, ghost
- ✅ Sizes: small, medium, large
- ✅ Optional: clear button, password toggle
- ✅ Light & dark theme support
- ✅ Full TypeScript interface
- ✅ Comprehensive accessibility

### DataTable
- ✅ Display tabular data with custom rendering
- ✅ Column sorting with visual feedback
- ✅ Row selection (single/multiple)
- ✅ Loading state with spinner
- ✅ Empty state with custom message
- ✅ Generic TypeScript support
- ✅ Responsive design
- ✅ Full accessibility compliance

## 📚 Storybook Documentation

Each component includes comprehensive Storybook documentation with:

- ✅ Component name & description
- ✅ Props & API definitions with TypeScript types
- ✅ Use cases & real-world examples
- ✅ Anatomy/structure breakdown
- ✅ States & variants showcase
- ✅ Interaction behavior demos
- ✅ Accessibility notes (ARIA roles, keyboard nav, focus)
- ✅ Theming and responsiveness handling
- ✅ Best practices, do's & don'ts

## 🚀 Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Run Storybook**:
   \`\`\`bash
   npm run storybook
   \`\`\`

4. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

## 🎯 Usage Examples

### InputField
\`\`\`tsx
import { InputField } from '@/components/ui/input-field'

function MyForm() {
  const [email, setEmail] = useState('')
  
  return (
    <InputField
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      variant="outlined"
      size="md"
      clearable
      onClear={() => setEmail('')}
    />
  )
}
\`\`\`

### DataTable
\`\`\`tsx
import { DataTable, Column } from '@/components/ui/data-table'

interface User {
  id: number
  name: string
  email: string
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true }
]

function UserTable({ users }: { users: User[] }) {
  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onRowSelect={(selected) => console.log(selected)}
    />
  )
}
\`\`\`

## 🎨 Design System

The components follow a consistent design system with:

- **Color Palette**: Semantic color tokens for light/dark themes
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing scale
- **Border Radius**: Consistent corner radius
- **Shadows**: Subtle elevation system
- **Focus States**: Clear focus indicators for accessibility

## ♿ Accessibility

Both components are built with accessibility in mind:

- **Semantic HTML**: Proper use of semantic elements
- **ARIA Labels**: Comprehensive ARIA attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Optimized for screen reader users
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Management**: Logical focus flow

## 🧪 Testing Approach

The components are designed to be easily testable with:

- **TypeScript**: Compile-time type checking
- **Storybook**: Visual testing and documentation
- **Accessibility**: Built-in a11y compliance
- **Props Validation**: Comprehensive prop interfaces

## 🚀 Deployment Ready

This project is fully deployment-ready with:

- **Production Build**: Optimized for production
- **Storybook Build**: Static Storybook deployment
- **TypeScript**: Full type safety
- **Performance**: Optimized components and lazy loading
- **SEO**: Proper meta tags and structure

## 📝 Component APIs

### InputField Props
\`\`\`typescript
interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  clearable?: boolean
  onClear?: () => void
  type?: 'text' | 'password' | 'email' | 'number'
}
\`\`\`

### DataTable Props
\`\`\`typescript
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  className?: string
  emptyMessage?: string
}

interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
}
\`\`\`

## 🎉 Conclusion

This implementation provides two production-ready React components with comprehensive documentation, full TypeScript support, and excellent accessibility. The components are designed to be flexible, reusable, and maintainable for any React application.
