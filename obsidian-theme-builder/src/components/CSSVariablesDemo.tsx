// Demo component to showcase CSS Variables system

import React, { useState } from 'react';
import { useCSSVariables } from '../hooks/useCSSVariables';
import { CSS_VARIABLE_CATEGORIES } from '../data/obsidian-variables';
import './CSSVariablesDemo.css';

export default function CSSVariablesDemo() {
  const {
    variables,
    changes,
    setVariable,
    resetVariable,
    resetAllVariables,
    getVariable,
    getVariablesByCategory,
    generateCSS,
    validation,
    isValid
  } = useCSSVariables();

  const [selectedCategory, setSelectedCategory] = useState('colors');
  const [showCSS, setShowCSS] = useState(false);

  const categories = Object.keys(CSS_VARIABLE_CATEGORIES);
  const categoryVariables = getVariablesByCategory(selectedCategory);

  const handleVariableChange = (name: string, value: string) => {
    setVariable(name, value);
  };

  const handleResetVariable = (name: string) => {
    resetVariable(name);
  };

  const handleResetAll = () => {
    resetAllVariables();
  };

  const handleGenerateCSS = () => {
    setShowCSS(true);
  };

  const cssCode = generateCSS();

  return (
    <div className="css-variables-demo">
      <div className="demo-header">
        <h2>CSS Variables Management System</h2>
        <p>This demo showcases the complete CSS variables mapping and management system.</p>
      </div>

      <div className="demo-controls">
        <div className="category-selector">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          <button onClick={handleResetAll} className="reset-all-btn">
            Reset All
          </button>
          <button onClick={handleGenerateCSS} className="generate-css-btn">
            Generate CSS
          </button>
        </div>
      </div>

      <div className="demo-content">
        <div className="variables-panel">
          <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Variables</h3>
          <div className="variables-list">
            {categoryVariables.map(variable => {
              const currentValue = variables[variable.name];
              const hasChanged = changes[variable.name];
              const variableValidation = validation[variable.name];
              const isVariableValid = isValid(variable.name);

              return (
                <div key={variable.name} className={`variable-item ${hasChanged ? 'changed' : ''} ${!isVariableValid ? 'invalid' : ''}`}>
                  <div className="variable-header">
                    <label htmlFor={variable.name} className="variable-label">
                      {variable.displayName}
                    </label>
                    {hasChanged && (
                      <button
                        onClick={() => handleResetVariable(variable.name)}
                        className="reset-variable-btn"
                        title="Reset to default"
                      >
                        ↺
                      </button>
                    )}
                  </div>
                  
                  <div className="variable-input-group">
                    <input
                      id={variable.name}
                      type="text"
                      value={currentValue}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      className={`variable-input ${!isVariableValid ? 'invalid' : ''}`}
                      placeholder={variable.defaultValue}
                    />
                    <span className="variable-name">{variable.name}</span>
                  </div>

                  <div className="variable-description">
                    {variable.description}
                  </div>

                  {variableValidation && !variableValidation.isValid && (
                    <div className="validation-errors">
                      {variableValidation.errors.map((error, index) => (
                        <div key={index} className="error-message">{error}</div>
                      ))}
                    </div>
                  )}

                  {variableValidation && variableValidation.warnings.length > 0 && (
                    <div className="validation-warnings">
                      {variableValidation.warnings.map((warning, index) => (
                        <div key={index} className="warning-message">{warning}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="preview-panel">
          <h3>Live Preview</h3>
          <div className="preview-content">
            <div className="preview-sidebar">
              <div className="preview-sidebar-header">File Explorer</div>
              <div className="preview-sidebar-content">
                <div className="preview-file">📁 Documents</div>
                <div className="preview-file">📄 notes.md</div>
                <div className="preview-file">📄 todo.md</div>
              </div>
            </div>
            
            <div className="preview-main">
              <div className="preview-header">
                <h1>Sample Note</h1>
                <div className="preview-toolbar">
                  <button className="preview-btn">Bold</button>
                  <button className="preview-btn">Italic</button>
                  <button className="preview-btn">Link</button>
                </div>
              </div>
              
              <div className="preview-editor">
                <p>This is a sample note with some <strong>bold text</strong> and <em>italic text</em>.</p>
                <p>You can see how the CSS variables affect the appearance in real-time.</p>
                <pre className="preview-code">console.log('Hello, Obsidian!');</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCSS && (
        <div className="css-output">
          <h3>Generated CSS</h3>
          <div className="css-code-container">
            <pre className="css-code">{cssCode}</pre>
            <button
              onClick={() => navigator.clipboard.writeText(cssCode)}
              className="copy-css-btn"
            >
              Copy CSS
            </button>
          </div>
        </div>
      )}

      <div className="demo-stats">
        <div className="stat-item">
          <span className="stat-label">Total Variables:</span>
          <span className="stat-value">{Object.keys(variables).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Changed Variables:</span>
          <span className="stat-value">{Object.keys(changes).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Invalid Variables:</span>
          <span className="stat-value">
            {Object.values(validation).filter(v => !v.isValid).length}
          </span>
        </div>
      </div>
    </div>
  );
}