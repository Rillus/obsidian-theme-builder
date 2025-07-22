// CSS Variables TypeScript interfaces

export interface CSSVariable {
  name: string;           // Original CSS variable name (e.g., --background-primary)
  displayName: string;    // User-friendly display name (e.g., "Primary Background")
  category: string;       // Category (colors, typography, spacing, layout, components)
  description: string;    // Description of what this variable controls
  defaultValue: string;   // Default value from Obsidian
  type: 'color' | 'size' | 'font' | 'spacing' | 'border' | 'shadow' | 'gradient';
  unit?: string;          // CSS unit (px, em, rem, %, etc.)
  dependencies?: string[]; // Other variables this depends on
  minValue?: string;      // Minimum valid value
  maxValue?: string;      // Maximum valid value
  options?: string[];     // Valid options for this variable
}

export interface CSSVariableCategory {
  id: string;
  name: string;
  description: string;
  variables: CSSVariable[];
  icon?: string;
}

export interface CSSVariableMap {
  [variableName: string]: CSSVariable;
}

export interface CSSVariableChange {
  name: string;
  value: string;
  timestamp: number;
}

export interface CSSVariableValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions?: string[];
}

export interface ThemeVariableSet {
  name: string;
  description: string;
  variables: Record<string, string>;
  isDefault?: boolean;
  isCustom?: boolean;
}

export interface CSSVariableGroup {
  name: string;
  variables: CSSVariable[];
  collapsed?: boolean;
}

// Categories for organizing CSS variables
export const CSS_VARIABLE_CATEGORIES = {
  COLORS: 'colors',
  TYPOGRAPHY: 'typography',
  SPACING: 'spacing',
  LAYOUT: 'layout',
  COMPONENTS: 'components',
  INTERACTIVE: 'interactive',
  ACCESSIBILITY: 'accessibility'
} as const;

export type CSSVariableCategoryType = typeof CSS_VARIABLE_CATEGORIES[keyof typeof CSS_VARIABLE_CATEGORIES];

// Variable types for validation and UI rendering
export const CSS_VARIABLE_TYPES = {
  COLOR: 'color',
  SIZE: 'size',
  FONT: 'font',
  SPACING: 'spacing',
  BORDER: 'border',
  SHADOW: 'shadow',
  GRADIENT: 'gradient'
} as const;

export type CSSVariableType = typeof CSS_VARIABLE_TYPES[keyof typeof CSS_VARIABLE_TYPES];