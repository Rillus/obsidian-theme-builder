// Complete mapping of Obsidian CSS variables
// Based on analysis of Obsidian's default themes and CSS structure

import type { CSSVariable, CSSVariableMap } from '../types/css-variables';

export const OBSIDIAN_CSS_VARIABLES: CSSVariable[] = [
  // ===== COLORS =====
  
  // Background Colors
  {
    name: '--background-primary',
    displayName: 'Primary Background',
    category: 'colors',
    description: 'Main background color for the application',
    defaultValue: '#ffffff',
    type: 'color'
  },
  {
    name: '--background-primary-alt',
    displayName: 'Primary Background Alt',
    category: 'colors',
    description: 'Alternative primary background color',
    defaultValue: '#f7f6f3',
    type: 'color'
  },
  {
    name: '--background-secondary',
    displayName: 'Secondary Background',
    category: 'colors',
    description: 'Secondary background color for panels and sidebars',
    defaultValue: '#fafafa',
    type: 'color'
  },
  {
    name: '--background-secondary-alt',
    displayName: 'Secondary Background Alt',
    category: 'colors',
    description: 'Alternative secondary background color',
    defaultValue: '#f0f0f0',
    type: 'color'
  },
  {
    name: '--background-modifier-border',
    displayName: 'Border Background',
    category: 'colors',
    description: 'Background color for borders and dividers',
    defaultValue: '#e0e0e0',
    type: 'color'
  },
  {
    name: '--background-modifier-form-field',
    displayName: 'Form Field Background',
    category: 'colors',
    description: 'Background color for form fields and inputs',
    defaultValue: '#ffffff',
    type: 'color'
  },
  {
    name: '--background-modifier-form-field-highlighted',
    displayName: 'Form Field Highlighted Background',
    category: 'colors',
    description: 'Background color for highlighted form fields',
    defaultValue: '#f0f0f0',
    type: 'color'
  },
  {
    name: '--background-modifier-box-shadow',
    displayName: 'Box Shadow Background',
    category: 'colors',
    description: 'Background color for box shadows',
    defaultValue: 'rgba(0, 0, 0, 0.1)',
    type: 'color'
  },
  {
    name: '--background-modifier-success',
    displayName: 'Success Background',
    category: 'colors',
    description: 'Background color for success states',
    defaultValue: '#4caf50',
    type: 'color'
  },
  {
    name: '--background-modifier-error',
    displayName: 'Error Background',
    category: 'colors',
    description: 'Background color for error states',
    defaultValue: '#f44336',
    type: 'color'
  },
  {
    name: '--background-modifier-error-rgb',
    displayName: 'Error Background RGB',
    category: 'colors',
    description: 'RGB values for error background color',
    defaultValue: '244, 67, 54',
    type: 'color'
  },
  {
    name: '--background-modifier-cover',
    displayName: 'Cover Background',
    category: 'colors',
    description: 'Background color for overlays and covers',
    defaultValue: 'rgba(0, 0, 0, 0.05)',
    type: 'color'
  },

  // Text Colors
  {
    name: '--text-normal',
    displayName: 'Normal Text',
    category: 'colors',
    description: 'Primary text color for normal content',
    defaultValue: '#2e3338',
    type: 'color'
  },
  {
    name: '--text-muted',
    displayName: 'Muted Text',
    category: 'colors',
    description: 'Secondary text color for less important content',
    defaultValue: '#787774',
    type: 'color'
  },
  {
    name: '--text-faint',
    displayName: 'Faint Text',
    category: 'colors',
    description: 'Very subtle text color for tertiary content',
    defaultValue: '#9b9a97',
    type: 'color'
  },
  {
    name: '--text-accent',
    displayName: 'Accent Text',
    category: 'colors',
    description: 'Accent color for highlighted text and links',
    defaultValue: '#7b68ee',
    type: 'color'
  },
  {
    name: '--text-accent-hover',
    displayName: 'Accent Text Hover',
    category: 'colors',
    description: 'Accent color for hover states',
    defaultValue: '#6a5acd',
    type: 'color'
  },
  {
    name: '--text-on-accent',
    displayName: 'Text on Accent',
    category: 'colors',
    description: 'Text color when on accent backgrounds',
    defaultValue: '#ffffff',
    type: 'color'
  },
  {
    name: '--text-selection',
    displayName: 'Selection Text',
    category: 'colors',
    description: 'Text color for selected content',
    defaultValue: '#ffffff',
    type: 'color'
  },
  {
    name: '--text-highlight-bg',
    displayName: 'Highlight Background',
    category: 'colors',
    description: 'Background color for highlighted text',
    defaultValue: '#ffeb3b',
    type: 'color'
  },
  {
    name: '--text-highlight-bg-active',
    displayName: 'Active Highlight Background',
    category: 'colors',
    description: 'Background color for active highlighted text',
    defaultValue: '#ffc107',
    type: 'color'
  },

  // Interactive Colors
  {
    name: '--interactive-normal',
    displayName: 'Normal Interactive',
    category: 'colors',
    description: 'Color for normal interactive elements',
    defaultValue: '#4a9eff',
    type: 'color'
  },
  {
    name: '--interactive-hover',
    displayName: 'Hover Interactive',
    category: 'colors',
    description: 'Color for hover states of interactive elements',
    defaultValue: '#3b8be6',
    type: 'color'
  },
  {
    name: '--interactive-accent',
    displayName: 'Accent Interactive',
    category: 'colors',
    description: 'Accent color for interactive elements',
    defaultValue: '#7b68ee',
    type: 'color'
  },
  {
    name: '--interactive-accent-hover',
    displayName: 'Accent Interactive Hover',
    category: 'colors',
    description: 'Accent hover color for interactive elements',
    defaultValue: '#6a5acd',
    type: 'color'
  },
  {
    name: '--interactive-success',
    displayName: 'Success Interactive',
    category: 'colors',
    description: 'Success color for interactive elements',
    defaultValue: '#4caf50',
    type: 'color'
  },

  // ===== TYPOGRAPHY =====
  
  // Font Families
  {
    name: '--font-text',
    displayName: 'Text Font',
    category: 'typography',
    description: 'Primary font family for text content',
    defaultValue: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    type: 'font'
  },
  {
    name: '--font-monospace',
    displayName: 'Monospace Font',
    category: 'typography',
    description: 'Monospace font family for code and technical content',
    defaultValue: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    type: 'font'
  },
  {
    name: '--font-interface',
    displayName: 'Interface Font',
    category: 'typography',
    description: 'Font family for interface elements',
    defaultValue: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    type: 'font'
  },

  // Font Sizes
  {
    name: '--font-smallest',
    displayName: 'Smallest Font Size',
    category: 'typography',
    description: 'Smallest font size for very small text',
    defaultValue: '10px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-smaller',
    displayName: 'Smaller Font Size',
    category: 'typography',
    description: 'Smaller font size for secondary text',
    defaultValue: '12px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-small',
    displayName: 'Small Font Size',
    category: 'typography',
    description: 'Small font size for captions and notes',
    defaultValue: '13px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui',
    displayName: 'UI Font Size',
    category: 'typography',
    description: 'Standard font size for user interface elements',
    defaultValue: '14px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui-smaller',
    displayName: 'Smaller UI Font Size',
    category: 'typography',
    description: 'Smaller font size for compact UI elements',
    defaultValue: '12px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui-small',
    displayName: 'Small UI Font Size',
    category: 'typography',
    description: 'Small font size for UI elements',
    defaultValue: '13px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui-medium',
    displayName: 'Medium UI Font Size',
    category: 'typography',
    description: 'Medium font size for UI elements',
    defaultValue: '15px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui-large',
    displayName: 'Large UI Font Size',
    category: 'typography',
    description: 'Large font size for UI elements',
    defaultValue: '16px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--font-ui-larger',
    displayName: 'Larger UI Font Size',
    category: 'typography',
    description: 'Larger font size for UI elements',
    defaultValue: '18px',
    type: 'size',
    unit: 'px'
  },

  // Line Heights
  {
    name: '--line-height-normal',
    displayName: 'Normal Line Height',
    category: 'typography',
    description: 'Normal line height for text content',
    defaultValue: '1.5',
    type: 'spacing'
  },
  {
    name: '--line-height-tight',
    displayName: 'Tight Line Height',
    category: 'typography',
    description: 'Tight line height for compact text',
    defaultValue: '1.3',
    type: 'spacing'
  },
  {
    name: '--line-height-loose',
    displayName: 'Loose Line Height',
    category: 'typography',
    description: 'Loose line height for spacious text',
    defaultValue: '1.7',
    type: 'spacing'
  },

  // ===== SPACING =====
  
  // General Spacing
  {
    name: '--size-2-1',
    displayName: 'Extra Small Size',
    category: 'spacing',
    description: 'Extra small spacing unit',
    defaultValue: '2px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-2',
    displayName: 'Small Size',
    category: 'spacing',
    description: 'Small spacing unit',
    defaultValue: '4px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-3',
    displayName: 'Medium Size',
    category: 'spacing',
    description: 'Medium spacing unit',
    defaultValue: '6px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-4',
    displayName: 'Large Size',
    category: 'spacing',
    description: 'Large spacing unit',
    defaultValue: '8px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-5',
    displayName: 'Extra Large Size',
    category: 'spacing',
    description: 'Extra large spacing unit',
    defaultValue: '10px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-6',
    displayName: '2X Large Size',
    category: 'spacing',
    description: '2X large spacing unit',
    defaultValue: '12px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-7',
    displayName: '3X Large Size',
    category: 'spacing',
    description: '3X large spacing unit',
    defaultValue: '14px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-8',
    displayName: '4X Large Size',
    category: 'spacing',
    description: '4X large spacing unit',
    defaultValue: '16px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-9',
    displayName: '5X Large Size',
    category: 'spacing',
    description: '5X large spacing unit',
    defaultValue: '18px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-10',
    displayName: '6X Large Size',
    category: 'spacing',
    description: '6X large spacing unit',
    defaultValue: '20px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-11',
    displayName: '7X Large Size',
    category: 'spacing',
    description: '7X large spacing unit',
    defaultValue: '22px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--size-2-12',
    displayName: '8X Large Size',
    category: 'spacing',
    description: '8X large spacing unit',
    defaultValue: '24px',
    type: 'size',
    unit: 'px'
  },

  // Border Radius
  {
    name: '--radius-s',
    displayName: 'Small Border Radius',
    category: 'spacing',
    description: 'Small border radius for subtle rounded corners',
    defaultValue: '2px',
    type: 'border',
    unit: 'px'
  },
  {
    name: '--radius-m',
    displayName: 'Medium Border Radius',
    category: 'spacing',
    description: 'Medium border radius for standard rounded corners',
    defaultValue: '4px',
    type: 'border',
    unit: 'px'
  },
  {
    name: '--radius-l',
    displayName: 'Large Border Radius',
    category: 'spacing',
    description: 'Large border radius for prominent rounded corners',
    defaultValue: '6px',
    type: 'border',
    unit: 'px'
  },

  // ===== LAYOUT =====
  
  // Sidebar
  {
    name: '--sidebar-width',
    displayName: 'Sidebar Width',
    category: 'layout',
    description: 'Width of the main sidebar',
    defaultValue: '250px',
    type: 'size',
    unit: 'px'
  },
  {
    name: '--sidebar-tab-width',
    displayName: 'Sidebar Tab Width',
    category: 'layout',
    description: 'Width of sidebar tabs',
    defaultValue: '30px',
    type: 'size',
    unit: 'px'
  },

  // Header
  {
    name: '--header-height',
    displayName: 'Header Height',
    category: 'layout',
    description: 'Height of the main header',
    defaultValue: '40px',
    type: 'size',
    unit: 'px'
  },

  // Content
  {
    name: '--content-padding',
    displayName: 'Content Padding',
    category: 'layout',
    description: 'Padding around main content area',
    defaultValue: '20px',
    type: 'size',
    unit: 'px'
  },

  // ===== COMPONENTS =====
  
  // Buttons
  {
    name: '--button-background',
    displayName: 'Button Background',
    category: 'components',
    description: 'Background color for buttons',
    defaultValue: 'var(--interactive-normal)',
    type: 'color'
  },
  {
    name: '--button-background-hover',
    displayName: 'Button Background Hover',
    category: 'components',
    description: 'Background color for button hover states',
    defaultValue: 'var(--interactive-hover)',
    type: 'color'
  },
  {
    name: '--button-background-active',
    displayName: 'Button Background Active',
    category: 'components',
    description: 'Background color for active button states',
    defaultValue: 'var(--interactive-accent)',
    type: 'color'
  },
  {
    name: '--button-border-width',
    displayName: 'Button Border Width',
    category: 'components',
    description: 'Border width for buttons',
    defaultValue: '1px',
    type: 'border',
    unit: 'px'
  },
  {
    name: '--button-border-radius',
    displayName: 'Button Border Radius',
    category: 'components',
    description: 'Border radius for buttons',
    defaultValue: 'var(--radius-m)',
    type: 'border'
  },

  // Input Fields
  {
    name: '--input-background',
    displayName: 'Input Background',
    category: 'components',
    description: 'Background color for input fields',
    defaultValue: 'var(--background-modifier-form-field)',
    type: 'color'
  },
  {
    name: '--input-border-width',
    displayName: 'Input Border Width',
    category: 'components',
    description: 'Border width for input fields',
    defaultValue: '1px',
    type: 'border',
    unit: 'px'
  },
  {
    name: '--input-border-radius',
    displayName: 'Input Border Radius',
    category: 'components',
    description: 'Border radius for input fields',
    defaultValue: 'var(--radius-s)',
    type: 'border'
  },

  // Modals
  {
    name: '--modal-background',
    displayName: 'Modal Background',
    category: 'components',
    description: 'Background color for modal dialogs',
    defaultValue: 'var(--background-primary)',
    type: 'color'
  },
  {
    name: '--modal-border-width',
    displayName: 'Modal Border Width',
    category: 'components',
    description: 'Border width for modal dialogs',
    defaultValue: '1px',
    type: 'border',
    unit: 'px'
  },
  {
    name: '--modal-border-radius',
    displayName: 'Modal Border Radius',
    category: 'components',
    description: 'Border radius for modal dialogs',
    defaultValue: 'var(--radius-l)',
    type: 'border'
  },
  {
    name: '--modal-shadow',
    displayName: 'Modal Shadow',
    category: 'components',
    description: 'Box shadow for modal dialogs',
    defaultValue: '0 4px 12px rgba(0, 0, 0, 0.15)',
    type: 'shadow'
  }
];

// Create a map for quick lookup
export const CSS_VARIABLE_MAP: CSSVariableMap = OBSIDIAN_CSS_VARIABLES.reduce((map, variable) => {
  map[variable.name] = variable;
  return map;
}, {} as CSSVariableMap);

// Export categories for easy access
export const CSS_VARIABLE_CATEGORIES = {
  colors: OBSIDIAN_CSS_VARIABLES.filter(v => v.category === 'colors'),
  typography: OBSIDIAN_CSS_VARIABLES.filter(v => v.category === 'typography'),
  spacing: OBSIDIAN_CSS_VARIABLES.filter(v => v.category === 'spacing'),
  layout: OBSIDIAN_CSS_VARIABLES.filter(v => v.category === 'layout'),
  components: OBSIDIAN_CSS_VARIABLES.filter(v => v.category === 'components')
};