import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import ObsidianHeader from './ObsidianHeader';
import ObsidianSidebar from './ObsidianSidebar';
import ObsidianEditor from './ObsidianEditor';
import ObsidianStatusBar from './ObsidianStatusBar';
import './ObsidianPreview.css';

interface ObsidianPreviewProps {
  previewMode?: 'editor' | 'reading' | 'settings';
}

const ObsidianPreview: React.FC<ObsidianPreviewProps> = ({ previewMode = 'editor' }) => {
  const { configuration } = useThemeStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Generate CSS variables for the preview
  const generatePreviewStyles = () => {
    const styles: Record<string, string> = {};
    
    // Color variables
    styles['--color-primary'] = configuration.colors.primary;
    styles['--color-secondary'] = configuration.colors.secondary;
    styles['--color-accent'] = configuration.colors.accent;
    styles['--color-background'] = configuration.colors.background;
    styles['--color-surface'] = configuration.colors.surface;
    styles['--color-text'] = configuration.colors.text;
    styles['--color-text-muted'] = configuration.colors.textMuted;
    styles['--color-border'] = configuration.colors.border;
    styles['--color-shadow'] = configuration.colors.shadow;
    
    // Typography variables
    styles['--font-family'] = configuration.typography.fontFamily;
    styles['--font-family-mono'] = configuration.typography.fontFamilyMono;
    styles['--font-size'] = configuration.typography.fontSize;
    styles['--line-height'] = configuration.typography.lineHeight;
    styles['--font-weight'] = configuration.typography.fontWeight;
    styles['--font-weight-bold'] = configuration.typography.fontWeightBold;
    
    // Layout variables
    styles['--sidebar-width'] = configuration.layout.sidebarWidth;
    styles['--header-height'] = configuration.layout.headerHeight;
    styles['--content-padding'] = configuration.layout.contentPadding;
    
    // Spacing variables
    styles['--spacing'] = configuration.spacing.spacing;
    styles['--border-radius'] = configuration.spacing.borderRadius;
    styles['--border-width'] = configuration.spacing.borderWidth;
    
    // Component variables
    styles['--button-bg'] = configuration.components.button.backgroundColor;
    styles['--button-text'] = configuration.components.button.textColor;
    styles['--button-border'] = configuration.components.button.borderColor;
    styles['--button-radius'] = configuration.components.button.borderRadius;
    
    styles['--input-bg'] = configuration.components.input.backgroundColor;
    styles['--input-text'] = configuration.components.input.textColor;
    styles['--input-border'] = configuration.components.input.borderColor;
    styles['--input-focus'] = configuration.components.input.focusColor;
    
    styles['--modal-bg'] = configuration.components.modal.backgroundColor;
    styles['--modal-border'] = configuration.components.modal.borderColor;
    styles['--modal-shadow'] = configuration.components.modal.shadowColor;
    
    return styles;
  };

  const previewStyles = generatePreviewStyles();

  return (
    <div className="obsidian-preview" style={previewStyles}>
      <div className="obsidian-window">
        {/* Header */}
        <ObsidianHeader 
          collapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main content area */}
        <div className="obsidian-main">
          {/* Sidebar */}
          <ObsidianSidebar collapsed={sidebarCollapsed} />
          
          {/* Editor/Content area */}
          <div className="obsidian-content">
            <ObsidianEditor mode={previewMode} />
          </div>
        </div>
        
        {/* Status bar */}
        <ObsidianStatusBar />
      </div>
      
      {/* Preview mode indicator */}
      <div className="preview-mode-indicator">
        <span className="mode-label">Preview Mode:</span>
        <span className="mode-value">{previewMode}</span>
      </div>
    </div>
  );
};

export default ObsidianPreview;