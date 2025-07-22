# CSS Variables Management

## Overview
The CSS Variables Management system provides a comprehensive mapping between Obsidian's internal CSS variables and user-friendly controls. This system enables users to customize Obsidian themes without needing to understand the underlying CSS variable names.

## Usage
The CSS Variables system automatically maps Obsidian's CSS variables to intuitive categories and provides real-time preview of changes.

### Examples
```typescript
// Access CSS variable mapping
const variableMap = getCSSVariableMap();

// Get variables by category
const colorVariables = getVariablesByCategory('colors');
const typographyVariables = getVariablesByCategory('typography');

// Apply theme changes
applyThemeVariables({
  '--background-primary': '#ffffff',
  '--text-normal': '#000000'
});
```

## Implementation

### Code Structure
- `src/types/css-variables.ts` - TypeScript interfaces for CSS variables
- `src/data/obsidian-variables.ts` - Complete mapping of Obsidian CSS variables
- `src/utils/variable-mapper.ts` - Utility functions for variable management
- `src/hooks/useCSSVariables.ts` - React hook for variable manipulation

### Dependencies
- `chroma-js` - For color manipulation and validation
- `zustand` - For state management of variable changes

## API Reference

### CSSVariable Interface
```typescript
interface CSSVariable {
  name: string;           // Original CSS variable name
  displayName: string;    // User-friendly display name
  category: string;       // Category (colors, typography, spacing, etc.)
  description: string;    // Description of what this variable controls
  defaultValue: string;   // Default value from Obsidian
  type: 'color' | 'size' | 'font' | 'spacing' | 'border';
  unit?: string;          // CSS unit (px, em, rem, etc.)
  dependencies?: string[]; // Other variables this depends on
}
```

### Core Functions
- `getCSSVariableMap()` - Returns complete variable mapping
- `getVariablesByCategory(category: string)` - Get variables by category
- `applyThemeVariables(variables: Record<string, string>)` - Apply variable changes
- `validateVariableValue(name: string, value: string)` - Validate variable values
- `generateCSSCode(variables: Record<string, string>)` - Generate CSS code

## Variable Categories

### Colors
- Background colors (primary, secondary, tertiary)
- Text colors (normal, muted, accent)
- Border colors
- Shadow colors
- Interactive element colors

### Typography
- Font families (main, monospace)
- Font sizes (small, normal, large)
- Font weights
- Line heights
- Letter spacing

### Spacing
- Margins and padding
- Border radius
- Border widths
- Gap values

### Layout
- Sidebar widths
- Header heights
- Content padding
- Modal dimensions

### Components
- Button styles
- Input field styles
- Modal styles
- Tab styles
- Scrollbar styles