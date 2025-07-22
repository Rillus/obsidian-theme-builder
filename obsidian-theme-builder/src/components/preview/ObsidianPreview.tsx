import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { generateDarkModeColors } from '../../utils/colorUtils';
import ObsidianHeader from './ObsidianHeader';
import ObsidianSidebar from './ObsidianSidebar';
import ObsidianEditor from './ObsidianEditor';
import ObsidianStatusBar from './ObsidianStatusBar';
import PreviewControls from './PreviewControls';
import './ObsidianPreview.css';

interface ObsidianPreviewProps {
  previewMode?: 'editor' | 'reading' | 'settings';
}

const ObsidianPreview: React.FC<ObsidianPreviewProps> = ({ previewMode: initialPreviewMode = 'editor' }) => {
  const { configuration } = useThemeStore();
  const [previewMode, setPreviewMode] = useState<'editor' | 'reading' | 'settings'>(initialPreviewMode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Generate CSS variables for the preview
  const generatePreviewStyles = () => {
    const styles: Record<string, string> = {};
    
    // Get colors based on current mode
    const currentColors = isDarkMode 
      ? generateDarkModeColors(configuration.colors as unknown as Record<string, string>)
      : configuration.colors;
    
    // Color variables
    styles['--color-primary'] = currentColors.primary;
    styles['--color-secondary'] = currentColors.secondary;
    styles['--color-accent'] = currentColors.accent;
    styles['--color-background'] = currentColors.background;
    styles['--color-surface'] = currentColors.surface;
    styles['--color-text'] = currentColors.text;
    styles['--color-text-muted'] = currentColors.textMuted;
    styles['--color-border'] = currentColors.border;
    styles['--color-shadow'] = currentColors.shadow;
    
    // Typography variables
    styles['--font-family'] = configuration.typography.fontFamily;
    styles['--font-family-mono'] = configuration.typography.fontFamilyMono;
    styles['--font-size-base'] = configuration.typography.fontSize;
    styles['--font-weight-normal'] = configuration.typography.fontWeight;
    styles['--font-weight-bold'] = configuration.typography.fontWeightBold;
    styles['--line-height'] = configuration.typography.lineHeight;
    
    // Layout variables
    styles['--sidebar-width'] = configuration.layout.sidebarWidth;
    styles['--header-height'] = configuration.layout.headerHeight;
    styles['--content-padding'] = configuration.layout.contentPadding;
    styles['--border-radius'] = configuration.spacing.borderRadius;
    styles['--spacing-small'] = configuration.spacing.spacing;
    styles['--spacing-medium'] = configuration.spacing.spacing;
    styles['--spacing-large'] = configuration.spacing.spacing;
    
    // Component variables
    styles['--button-bg'] = configuration.components.button.backgroundColor;
    styles['--button-text'] = configuration.components.button.textColor;
    styles['--button-border'] = configuration.components.button.borderColor;
    styles['--input-bg'] = configuration.components.input.backgroundColor;
    styles['--input-text'] = configuration.components.input.textColor;
    styles['--input-border'] = configuration.components.input.borderColor;
    styles['--input-focus'] = configuration.components.input.focusColor;
    styles['--modal-bg'] = configuration.components.modal.backgroundColor;
    styles['--modal-border'] = configuration.components.modal.borderColor;
    
    return styles;
  };

  const previewStyles = generatePreviewStyles();

  // Event handlers
  const handlePreviewModeChange = (mode: 'editor' | 'reading' | 'settings') => {
    setPreviewMode(mode);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="obsidian-preview-container">
      {/* Preview Controls */}
      <PreviewControls
        previewMode={previewMode}
        onPreviewModeChange={handlePreviewModeChange}
        isDarkMode={isDarkMode}
        onDarkModeToggle={handleDarkModeToggle}
      />
      
      {/* Obsidian Preview */}
      <div className="obsidian-preview" style={previewStyles}>
        <div className="obsidian-window">
          {/* Header */}
          <ObsidianHeader />
          
          {/* Main content area */}
          <div className="obsidian-main">
            {/* Sidebar */}
            <ObsidianSidebar />
            
            {/* Editor/Content area */}
            <ObsidianEditor mode={previewMode} />
          </div>
          
          {/* Status bar */}
          <ObsidianStatusBar />
        </div>
      </div>
    </div>
  );
};

export default ObsidianPreview;