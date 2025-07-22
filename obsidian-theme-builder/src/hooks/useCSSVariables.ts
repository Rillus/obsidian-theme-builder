// React hook for CSS variable management

import { useState, useCallback, useEffect } from 'react';
import { CSSVariable, CSSVariableValidation } from '../types/css-variables';
import { 
  getCSSVariableMap, 
  getVariablesByCategory, 
  applyThemeVariables, 
  resetThemeVariables,
  validateVariableValue,
  generateCSSCode,
  getSuggestedValues
} from '../utils/variable-mapper';

interface UseCSSVariablesReturn {
  // State
  variables: Record<string, string>;
  changes: Record<string, string>;
  validation: Record<string, CSSVariableValidation>;
  
  // Actions
  setVariable: (name: string, value: string) => void;
  resetVariable: (name: string) => void;
  resetAllVariables: () => void;
  applyChanges: () => void;
  getVariable: (name: string) => CSSVariable | undefined;
  getVariablesByCategory: (category: string) => CSSVariable[];
  getSuggestedValues: (name: string) => string[];
  generateCSS: () => string;
  
  // Validation
  validateVariable: (name: string, value: string) => CSSVariableValidation;
  isValid: (name: string) => boolean;
}

export function useCSSVariables(): UseCSSVariablesReturn {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [changes, setChanges] = useState<Record<string, string>>({});
  const [validation, setValidation] = useState<Record<string, CSSVariableValidation>>({});

  // Initialize with default values
  useEffect(() => {
    const variableMap = getCSSVariableMap();
    const defaults: Record<string, string> = {};
    
    Object.values(variableMap).forEach(variable => {
      defaults[variable.name] = variable.defaultValue;
    });
    
    setVariables(defaults);
  }, []);

  // Set a variable value
  const setVariable = useCallback((name: string, value: string) => {
    const variableMap = getCSSVariableMap();
    const variable = variableMap[name];
    
    if (!variable) {
      console.warn(`Unknown CSS variable: ${name}`);
      return;
    }

    // Validate the value
    const validationResult = validateVariableValue(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: validationResult
    }));

    // Update the variable
    setVariables(prev => ({
      ...prev,
      [name]: value
    }));

    // Track changes
    if (value !== variable.defaultValue) {
      setChanges(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setChanges(prev => {
        const newChanges = { ...prev };
        delete newChanges[name];
        return newChanges;
      });
    }

    // Apply to document immediately for real-time preview
    applyThemeVariables({ [name]: value });
  }, []);

  // Reset a variable to its default value
  const resetVariable = useCallback((name: string) => {
    const variableMap = getCSSVariableMap();
    const variable = variableMap[name];
    
    if (!variable) {
      console.warn(`Unknown CSS variable: ${name}`);
      return;
    }

    setVariable(name, variable.defaultValue);
  }, [setVariable]);

  // Reset all variables to default values
  const resetAllVariables = useCallback(() => {
    resetThemeVariables();
    
    const variableMap = getCSSVariableMap();
    const defaults: Record<string, string> = {};
    
    Object.values(variableMap).forEach(variable => {
      defaults[variable.name] = variable.defaultValue;
    });
    
    setVariables(defaults);
    setChanges({});
    setValidation({});
  }, []);

  // Apply all changes to the document
  const applyChanges = useCallback(() => {
    applyThemeVariables(changes);
  }, [changes]);

  // Get a specific variable definition
  const getVariable = useCallback((name: string) => {
    const variableMap = getCSSVariableMap();
    return variableMap[name];
  }, []);

  // Get variables by category
  const getVariablesByCategoryCallback = useCallback((category: string) => {
    return getVariablesByCategory(category as any);
  }, []);

  // Get suggested values for a variable
  const getSuggestedValuesCallback = useCallback((name: string) => {
    return getSuggestedValues(name);
  }, []);

  // Generate CSS code
  const generateCSS = useCallback(() => {
    return generateCSSCode(changes);
  }, [changes]);

  // Validate a variable value
  const validateVariable = useCallback((name: string, value: string) => {
    return validateVariableValue(name, value);
  }, []);

  // Check if a variable is valid
  const isValid = useCallback((name: string) => {
    return validation[name]?.isValid ?? true;
  }, [validation]);

  return {
    // State
    variables,
    changes,
    validation,
    
    // Actions
    setVariable,
    resetVariable,
    resetAllVariables,
    applyChanges,
    getVariable,
    getVariablesByCategory: getVariablesByCategoryCallback,
    getSuggestedValues: getSuggestedValuesCallback,
    generateCSS,
    
    // Validation
    validateVariable,
    isValid
  };
}