// Utility functions for CSS variable management

import chroma from 'chroma-js';
import { 
  CSSVariable, 
  CSSVariableMap, 
  CSSVariableValidation,
  CSSVariableCategoryType 
} from '../types/css-variables';
import { OBSIDIAN_CSS_VARIABLES, CSS_VARIABLE_MAP, CSS_VARIABLE_CATEGORIES } from '../data/obsidian-variables';

/**
 * Get the complete CSS variable mapping
 */
export function getCSSVariableMap(): CSSVariableMap {
  return CSS_VARIABLE_MAP;
}

/**
 * Get all CSS variables
 */
export function getAllCSSVariables(): CSSVariable[] {
  return OBSIDIAN_CSS_VARIABLES;
}

/**
 * Get variables by category
 */
export function getVariablesByCategory(category: CSSVariableCategoryType): CSSVariable[] {
  return OBSIDIAN_CSS_VARIABLES.filter(variable => variable.category === category);
}

/**
 * Get a specific CSS variable by name
 */
export function getCSSVariable(name: string): CSSVariable | undefined {
  return CSS_VARIABLE_MAP[name];
}

/**
 * Apply theme variables to the document
 */
export function applyThemeVariables(variables: Record<string, string>): void {
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([name, value]) => {
    if (name.startsWith('--')) {
      root.style.setProperty(name, value);
    }
  });
}

/**
 * Reset all CSS variables to their default values
 */
export function resetThemeVariables(): void {
  const root = document.documentElement;
  
  OBSIDIAN_CSS_VARIABLES.forEach(variable => {
    root.style.setProperty(variable.name, variable.defaultValue);
  });
}

/**
 * Validate a CSS variable value
 */
export function validateVariableValue(name: string, value: string): CSSVariableValidation {
  const variable = getCSSVariable(name);
  const validation: CSSVariableValidation = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!variable) {
    validation.isValid = false;
    validation.errors.push(`Unknown CSS variable: ${name}`);
    return validation;
  }

  // Validate based on variable type
  switch (variable.type) {
    case 'color':
      validation.isValid = validateColorValue(value, validation);
      break;
    case 'size':
      validation.isValid = validateSizeValue(value, variable, validation);
      break;
    case 'font':
      validation.isValid = validateFontValue(value, validation);
      break;
    case 'spacing':
      validation.isValid = validateSpacingValue(value, validation);
      break;
    case 'border':
      validation.isValid = validateBorderValue(value, variable, validation);
      break;
    case 'shadow':
      validation.isValid = validateShadowValue(value, validation);
      break;
    case 'gradient':
      validation.isValid = validateGradientValue(value, validation);
      break;
  }

  // Check min/max values if specified
  if (variable.minValue && variable.maxValue) {
    const numericValue = parseFloat(value);
    const minValue = parseFloat(variable.minValue);
    const maxValue = parseFloat(variable.maxValue);
    
    if (!isNaN(numericValue)) {
      if (numericValue < minValue) {
        validation.warnings.push(`Value is below minimum (${variable.minValue})`);
      }
      if (numericValue > maxValue) {
        validation.warnings.push(`Value is above maximum (${variable.maxValue})`);
      }
    }
  }

  // Check options if specified
  if (variable.options && variable.options.length > 0) {
    if (!variable.options.includes(value)) {
      validation.warnings.push(`Value should be one of: ${variable.options.join(', ')}`);
    }
  }

  return validation;
}

/**
 * Generate CSS code from variable changes
 */
export function generateCSSCode(variables: Record<string, string>): string {
  const lines: string[] = [];
  
  // Group variables by category for better organization
  const categories = ['colors', 'typography', 'spacing', 'layout', 'components'];
  
  categories.forEach(category => {
    const categoryVariables = getVariablesByCategory(category as CSSVariableCategoryType);
    const categoryChanges = categoryVariables.filter(v => variables[v.name]);
    
    if (categoryChanges.length > 0) {
      lines.push(`/* ${category.charAt(0).toUpperCase() + category.slice(1)} */`);
      categoryChanges.forEach(variable => {
        const value = variables[variable.name];
        if (value) {
          lines.push(`  ${variable.name}: ${value};`);
        }
      });
      lines.push('');
    }
  });

  return lines.join('\n');
}

/**
 * Get variables that depend on a specific variable
 */
export function getDependentVariables(variableName: string): CSSVariable[] {
  return OBSIDIAN_CSS_VARIABLES.filter(variable => 
    variable.dependencies?.includes(variableName)
  );
}

/**
 * Get suggested values for a variable based on its type and context
 */
export function getSuggestedValues(variableName: string): string[] {
  const variable = getCSSVariable(variableName);
  if (!variable) return [];

  switch (variable.type) {
    case 'color':
      return [
        '#ffffff', // White
        '#000000', // Black
        '#f0f0f0', // Light gray
        '#333333', // Dark gray
        '#4a9eff', // Blue
        '#7b68ee', // Purple
        '#4caf50', // Green
        '#ff9800', // Orange
        '#f44336'  // Red
      ];
    case 'size':
      return ['8px', '12px', '16px', '20px', '24px', '32px', '48px'];
    case 'font':
      return [
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
        'Georgia, "Times New Roman", serif',
        'Arial, Helvetica, sans-serif'
      ];
    case 'spacing':
      return ['0.5', '1', '1.5', '2', '2.5', '3'];
    case 'border':
      return ['0px', '1px', '2px', '3px', '4px'];
    default:
      return [];
  }
}

// Private validation functions

function validateColorValue(value: string, validation: CSSVariableValidation): boolean {
  try {
    chroma(value);
    return true;
  } catch {
    validation.errors.push('Invalid color value');
    validation.suggestions.push('Use hex (#ffffff), rgb(r, g, b), or named colors');
    return false;
  }
}

function validateSizeValue(value: string, variable: CSSVariable, validation: CSSVariableValidation): boolean {
  const sizeRegex = /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/;
  if (!sizeRegex.test(value)) {
    validation.errors.push('Invalid size value');
    validation.suggestions.push(`Use format: number + unit (e.g., 16px, 1.5em, 100%)`);
    return false;
  }
  return true;
}

function validateFontValue(value: string, validation: CSSVariableValidation): boolean {
  // Basic font validation - check if it contains font names
  if (value.length < 3) {
    validation.errors.push('Font value too short');
    return false;
  }
  return true;
}

function validateSpacingValue(value: string, validation: CSSVariableValidation): boolean {
  const spacingRegex = /^\d+(\.\d+)?$/;
  if (!spacingRegex.test(value)) {
    validation.errors.push('Invalid spacing value');
    validation.suggestions.push('Use numeric values (e.g., 1.5, 2, 0.5)');
    return false;
  }
  return true;
}

function validateBorderValue(value: string, variable: CSSVariable, validation: CSSVariableValidation): boolean {
  if (variable.unit === 'px') {
    const borderRegex = /^\d+(\.\d+)?px$/;
    if (!borderRegex.test(value)) {
      validation.errors.push('Invalid border value');
      validation.suggestions.push('Use format: number + px (e.g., 1px, 2px)');
      return false;
    }
  }
  return true;
}

function validateShadowValue(value: string, validation: CSSVariableValidation): boolean {
  // Basic shadow validation
  if (value.length < 5) {
    validation.errors.push('Shadow value too short');
    validation.suggestions.push('Use format: offset-x offset-y blur-radius color');
    return false;
  }
  return true;
}

function validateGradientValue(value: string, validation: CSSVariableValidation): boolean {
  if (!value.includes('gradient')) {
    validation.errors.push('Invalid gradient value');
    validation.suggestions.push('Use linear-gradient() or radial-gradient()');
    return false;
  }
  return true;
}