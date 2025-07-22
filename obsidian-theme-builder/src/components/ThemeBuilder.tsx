import React, { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import { exportThemeFiles, exportThemeAsZip, copyToClipboard } from '../utils/fileExport';
import './ThemeBuilder.css';

const ThemeBuilder: React.FC = () => {
  const {
    configuration,
    validation,
    isExporting,
    exportError,
    lastSaved,
    history,
    historyIndex,
    updateConfiguration,
    exportTheme,
    resetTheme,
    undo,
    redo
  } = useThemeStore();

  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'components'>('colors');
  const [showExportModal, setShowExportModal] = useState(false);

  // Handle configuration updates
  const handleConfigUpdate = (path: string, value: string) => {
    const pathParts = path.split('.');
    const updates: any = {};
    let current = updates;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current[pathParts[i]] = {};
      current = current[pathParts[i]];
    }
    current[pathParts[pathParts.length - 1]] = value;
    
    updateConfiguration(updates);
  };

  // Handle export
  const handleExport = async (format: 'files' | 'zip') => {
    try {
      const theme = await exportTheme();
      
      if (format === 'zip') {
        await exportThemeAsZip(theme, configuration.manifest.name);
      } else {
        exportThemeFiles(theme, configuration.manifest.name);
      }
      
      setShowExportModal(false);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Handle copy CSS
  const handleCopyCSS = async () => {
    try {
      const theme = await exportTheme();
      const success = await copyToClipboard(theme.css);
      if (success) {
        alert('CSS copied to clipboard!');
      } else {
        alert('Failed to copy to clipboard');
      }
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="theme-builder">
      {/* Header with actions */}
      <div className="builder-header">
        <div className="header-left">
          <h2>Theme Builder</h2>
          <div className="validation-status">
            {validation.isValid ? (
              <span className="status-valid">✓ Valid</span>
            ) : (
              <span className="status-invalid">✗ Invalid</span>
            )}
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            ↩ Undo
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            ↪ Redo
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={resetTheme}
            title="Reset to default"
          >
            🔄 Reset
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowExportModal(true)}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export Theme'}
          </button>
        </div>
      </div>

      {/* Validation errors */}
      {!validation.isValid && (
        <div className="validation-errors">
          <h4>Validation Errors:</h4>
          <ul>
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Export error */}
      {exportError && (
        <div className="export-error">
          <h4>Export Error:</h4>
          <p>{exportError}</p>
        </div>
      )}

      {/* Main content */}
      <div className="builder-content">
        {/* Left panel - Controls */}
        <div className="controls-panel">
          {/* Tab navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
              onClick={() => setActiveTab('colors')}
            >
              🎨 Colors
            </button>
            <button
              className={`tab-btn ${activeTab === 'typography' ? 'active' : ''}`}
              onClick={() => setActiveTab('typography')}
            >
              📝 Typography
            </button>
            <button
              className={`tab-btn ${activeTab === 'layout' ? 'active' : ''}`}
              onClick={() => setActiveTab('layout')}
            >
              📐 Layout
            </button>
            <button
              className={`tab-btn ${activeTab === 'components' ? 'active' : ''}`}
              onClick={() => setActiveTab('components')}
            >
              🧩 Components
            </button>
          </div>

          {/* Tab content */}
          <div className="tab-content">
            {activeTab === 'colors' && (
              <div className="colors-tab">
                <h3>Color Palette</h3>
                
                <div className="control-group">
                  <label>Primary Color</label>
                  <input
                    type="color"
                    value={configuration.colors.primary}
                    onChange={(e) => handleConfigUpdate('colors.primary', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.primary}
                    onChange={(e) => handleConfigUpdate('colors.primary', e.target.value)}
                    placeholder="#007acc"
                  />
                </div>

                <div className="control-group">
                  <label>Secondary Color</label>
                  <input
                    type="color"
                    value={configuration.colors.secondary}
                    onChange={(e) => handleConfigUpdate('colors.secondary', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.secondary}
                    onChange={(e) => handleConfigUpdate('colors.secondary', e.target.value)}
                    placeholder="#6c757d"
                  />
                </div>

                <div className="control-group">
                  <label>Accent Color</label>
                  <input
                    type="color"
                    value={configuration.colors.accent}
                    onChange={(e) => handleConfigUpdate('colors.accent', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.accent}
                    onChange={(e) => handleConfigUpdate('colors.accent', e.target.value)}
                    placeholder="#28a745"
                  />
                </div>

                <div className="control-group">
                  <label>Background Color</label>
                  <input
                    type="color"
                    value={configuration.colors.background}
                    onChange={(e) => handleConfigUpdate('colors.background', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.background}
                    onChange={(e) => handleConfigUpdate('colors.background', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>

                <div className="control-group">
                  <label>Surface Color</label>
                  <input
                    type="color"
                    value={configuration.colors.surface}
                    onChange={(e) => handleConfigUpdate('colors.surface', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.surface}
                    onChange={(e) => handleConfigUpdate('colors.surface', e.target.value)}
                    placeholder="#f8f9fa"
                  />
                </div>

                <div className="control-group">
                  <label>Text Color</label>
                  <input
                    type="color"
                    value={configuration.colors.text}
                    onChange={(e) => handleConfigUpdate('colors.text', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.text}
                    onChange={(e) => handleConfigUpdate('colors.text', e.target.value)}
                    placeholder="#212529"
                  />
                </div>

                <div className="control-group">
                  <label>Muted Text Color</label>
                  <input
                    type="color"
                    value={configuration.colors.textMuted}
                    onChange={(e) => handleConfigUpdate('colors.textMuted', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.textMuted}
                    onChange={(e) => handleConfigUpdate('colors.textMuted', e.target.value)}
                    placeholder="#6c757d"
                  />
                </div>

                <div className="control-group">
                  <label>Border Color</label>
                  <input
                    type="color"
                    value={configuration.colors.border}
                    onChange={(e) => handleConfigUpdate('colors.border', e.target.value)}
                  />
                  <input
                    type="text"
                    value={configuration.colors.border}
                    onChange={(e) => handleConfigUpdate('colors.border', e.target.value)}
                    placeholder="#dee2e6"
                  />
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="typography-tab">
                <h3>Typography Settings</h3>
                
                <div className="control-group">
                  <label>Font Family</label>
                  <select
                    value={configuration.typography.fontFamily}
                    onChange={(e) => handleConfigUpdate('typography.fontFamily', e.target.value)}
                  >
                    <option value="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Inter</option>
                    <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lato', sans-serif">Lato</option>
                    <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>Monospace Font Family</label>
                  <select
                    value={configuration.typography.fontFamilyMono}
                    onChange={(e) => handleConfigUpdate('typography.fontFamilyMono', e.target.value)}
                  >
                    <option value="'JetBrains Mono', Consolas, 'Courier New', monospace">JetBrains Mono</option>
                    <option value="'Fira Code', Consolas, 'Courier New', monospace">Fira Code</option>
                    <option value="'Source Code Pro', Consolas, 'Courier New', monospace">Source Code Pro</option>
                    <option value="Consolas, 'Courier New', monospace">Consolas</option>
                    <option value="'Courier New', monospace">Courier New</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>Font Size</label>
                  <input
                    type="text"
                    value={configuration.typography.fontSize}
                    onChange={(e) => handleConfigUpdate('typography.fontSize', e.target.value)}
                    placeholder="14px"
                  />
                </div>

                <div className="control-group">
                  <label>Line Height</label>
                  <input
                    type="text"
                    value={configuration.typography.lineHeight}
                    onChange={(e) => handleConfigUpdate('typography.lineHeight', e.target.value)}
                    placeholder="1.6"
                  />
                </div>

                <div className="control-group">
                  <label>Font Weight</label>
                  <select
                    value={configuration.typography.fontWeight}
                    onChange={(e) => handleConfigUpdate('typography.fontWeight', e.target.value)}
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>Bold Font Weight</label>
                  <select
                    value={configuration.typography.fontWeightBold}
                    onChange={(e) => handleConfigUpdate('typography.fontWeightBold', e.target.value)}
                  >
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                    <option value="900">Black (900)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="layout-tab">
                <h3>Layout Settings</h3>
                
                <div className="control-group">
                  <label>Sidebar Width</label>
                  <input
                    type="text"
                    value={configuration.layout.sidebarWidth}
                    onChange={(e) => handleConfigUpdate('layout.sidebarWidth', e.target.value)}
                    placeholder="250px"
                  />
                </div>

                <div className="control-group">
                  <label>Header Height</label>
                  <input
                    type="text"
                    value={configuration.layout.headerHeight}
                    onChange={(e) => handleConfigUpdate('layout.headerHeight', e.target.value)}
                    placeholder="48px"
                  />
                </div>

                <div className="control-group">
                  <label>Content Padding</label>
                  <input
                    type="text"
                    value={configuration.layout.contentPadding}
                    onChange={(e) => handleConfigUpdate('layout.contentPadding', e.target.value)}
                    placeholder="16px"
                  />
                </div>

                <div className="control-group">
                  <label>Spacing</label>
                  <input
                    type="text"
                    value={configuration.spacing.spacing}
                    onChange={(e) => handleConfigUpdate('spacing.spacing', e.target.value)}
                    placeholder="8px"
                  />
                </div>

                <div className="control-group">
                  <label>Border Radius</label>
                  <input
                    type="text"
                    value={configuration.spacing.borderRadius}
                    onChange={(e) => handleConfigUpdate('spacing.borderRadius', e.target.value)}
                    placeholder="4px"
                  />
                </div>

                <div className="control-group">
                  <label>Border Width</label>
                  <input
                    type="text"
                    value={configuration.spacing.borderWidth}
                    onChange={(e) => handleConfigUpdate('spacing.borderWidth', e.target.value)}
                    placeholder="1px"
                  />
                </div>
              </div>
            )}

            {activeTab === 'components' && (
              <div className="components-tab">
                <h3>Component Settings</h3>
                
                <h4>Buttons</h4>
                <div className="control-group">
                  <label>Button Background</label>
                  <input
                    type="color"
                    value={configuration.components.button.backgroundColor}
                    onChange={(e) => handleConfigUpdate('components.button.backgroundColor', e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label>Button Text Color</label>
                  <input
                    type="color"
                    value={configuration.components.button.textColor}
                    onChange={(e) => handleConfigUpdate('components.button.textColor', e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label>Button Border Radius</label>
                  <input
                    type="text"
                    value={configuration.components.button.borderRadius}
                    onChange={(e) => handleConfigUpdate('components.button.borderRadius', e.target.value)}
                    placeholder="4px"
                  />
                </div>

                <h4>Input Fields</h4>
                <div className="control-group">
                  <label>Input Background</label>
                  <input
                    type="color"
                    value={configuration.components.input.backgroundColor}
                    onChange={(e) => handleConfigUpdate('components.input.backgroundColor', e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label>Input Text Color</label>
                  <input
                    type="color"
                    value={configuration.components.input.textColor}
                    onChange={(e) => handleConfigUpdate('components.input.textColor', e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label>Input Focus Color</label>
                  <input
                    type="color"
                    value={configuration.components.input.focusColor}
                    onChange={(e) => handleConfigUpdate('components.input.focusColor', e.target.value)}
                  />
                </div>

                <h4>Modals</h4>
                <div className="control-group">
                  <label>Modal Background</label>
                  <input
                    type="color"
                    value={configuration.components.modal.backgroundColor}
                    onChange={(e) => handleConfigUpdate('components.modal.backgroundColor', e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label>Modal Border Color</label>
                  <input
                    type="color"
                    value={configuration.components.modal.borderColor}
                    onChange={(e) => handleConfigUpdate('components.modal.borderColor', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Preview */}
        <div className="preview-panel">
          <h3>Live Preview</h3>
          <div className="preview-container">
            <div className="preview-placeholder">
              <p>Preview will be implemented in Stage 4</p>
              <p>Current theme configuration:</p>
              <pre>{JSON.stringify(configuration, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Export Theme</h3>
            <p>Choose how you want to export your theme:</p>
            
            <div className="export-options">
              <button 
                className="btn btn-primary" 
                onClick={() => handleExport('files')}
              >
                Download Files (manifest.json + theme.css)
              </button>
              
              <button 
                className="btn btn-secondary" 
                onClick={() => handleExport('zip')}
              >
                Download as ZIP
              </button>
              
              <button 
                className="btn btn-secondary" 
                onClick={handleCopyCSS}
              >
                Copy CSS to Clipboard
              </button>
            </div>
            
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowExportModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeBuilder;