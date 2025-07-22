import { ThemeConfiguration, ThemeManifest, CSSVariable, ThemeExport } from '../types/theme';
import { OBSIDIAN_CSS_VARIABLES } from '../data/obsidian-variables';

export class ThemeEngine {
  private configuration: ThemeConfiguration;

  constructor(initialConfig?: Partial<ThemeConfiguration>) {
    this.configuration = this.getDefaultConfiguration();
    if (initialConfig) {
      this.configuration = { ...this.configuration, ...initialConfig };
    }
  }

  /**
   * Get default theme configuration
   */
  private getDefaultConfiguration(): ThemeConfiguration {
    return {
      manifest: {
        name: 'Custom Theme',
        version: '1.0.0',
        author: 'Theme Builder User',
        description: 'A custom theme created with Obsidian Theme Builder',
        minAppVersion: '1.0.0'
      },
      colors: {
        primary: '#007acc',
        secondary: '#6c757d',
        accent: '#28a745',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#212529',
        textMuted: '#6c757d',
        border: '#dee2e6',
        shadow: 'rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontFamilyMono: 'JetBrains Mono, Consolas, "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.6',
        fontWeight: '400',
        fontWeightBold: '600'
      },
      spacing: {
        spacing: '8px',
        borderRadius: '4px',
        borderWidth: '1px'
      },
      layout: {
        sidebarWidth: '250px',
        headerHeight: '48px',
        contentPadding: '16px'
      },
      components: {
        button: {
          backgroundColor: '#007acc',
          textColor: '#ffffff',
          borderColor: '#007acc',
          borderRadius: '4px'
        },
        input: {
          backgroundColor: '#ffffff',
          textColor: '#212529',
          borderColor: '#dee2e6',
          focusColor: '#007acc'
        },
        modal: {
          backgroundColor: '#ffffff',
          borderColor: '#dee2e6',
          shadowColor: 'rgba(0, 0, 0, 0.15)'
        }
      },
      mode: 'light'
    };
  }

  /**
   * Update theme configuration
   */
  updateConfiguration(updates: Partial<ThemeConfiguration>): void {
    this.configuration = { ...this.configuration, ...updates };
  }

  /**
   * Get current configuration
   */
  getConfiguration(): ThemeConfiguration {
    return { ...this.configuration };
  }

  /**
   * Validate theme configuration
   */
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate manifest
    if (!this.configuration.manifest.name.trim()) {
      errors.push('Theme name is required');
    }
    if (!this.configuration.manifest.author.trim()) {
      errors.push('Theme author is required');
    }

    // Validate colors (basic hex validation)
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbaRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/;

    Object.entries(this.configuration.colors).forEach(([key, value]) => {
      if (!colorRegex.test(value) && !rgbaRegex.test(value)) {
        errors.push(`Invalid color format for ${key}: ${value}`);
      }
    });

    // Validate typography
    if (!this.configuration.typography.fontSize.match(/^\d+px$/)) {
      errors.push('Font size must be in pixels (e.g., "14px")');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate CSS variables from configuration
   */
  private generateCSSVariables(): CSSVariable[] {
    const variables: CSSVariable[] = [];

    // Map configuration to Obsidian CSS variables
    const colorMappings = {
      '--background-primary': this.configuration.colors.background,
      '--background-secondary': this.configuration.colors.surface,
      '--text-normal': this.configuration.colors.text,
      '--text-muted': this.configuration.colors.textMuted,
      '--text-accent': this.configuration.colors.primary,
      '--text-accent-hover': this.configuration.colors.accent,
      '--interactive-accent': this.configuration.colors.primary,
      '--interactive-accent-hover': this.configuration.colors.accent,
      '--background-modifier-border': this.configuration.colors.border,
      '--background-modifier-box-shadow': this.configuration.colors.shadow,
    };

    // Add color variables
    Object.entries(colorMappings).forEach(([name, value]) => {
      variables.push({
        name,
        value,
        category: 'colors',
        description: `Generated from theme configuration`,
        defaultValue: value
      });
    });

    // Add typography variables
    const typographyMappings = {
      '--font-text': this.configuration.typography.fontFamily,
      '--font-monospace': this.configuration.typography.fontFamilyMono,
      '--font-text-size': this.configuration.typography.fontSize,
      '--line-height-normal': this.configuration.typography.lineHeight,
      '--font-weight-normal': this.configuration.typography.fontWeight,
      '--font-weight-bold': this.configuration.typography.fontWeightBold,
    };

    Object.entries(typographyMappings).forEach(([name, value]) => {
      variables.push({
        name,
        value,
        category: 'typography',
        description: `Generated from theme configuration`,
        defaultValue: value
      });
    });

    return variables;
  }

  /**
   * Generate CSS content
   */
  private generateCSS(): string {
    const variables = this.generateCSSVariables();
    
    let css = `/* Generated by Obsidian Theme Builder */\n`;
    css += `/* Theme: ${this.configuration.manifest.name} */\n`;
    css += `/* Version: ${this.configuration.manifest.version} */\n\n`;

    // Add CSS variables
    css += `:root {\n`;
    variables.forEach(variable => {
      css += `  ${variable.name}: ${variable.value};\n`;
    });
    css += `}\n\n`;

    // Add component-specific styles
    css += this.generateComponentStyles();

    return css;
  }

  /**
   * Generate component-specific styles
   */
  private generateComponentStyles(): string {
    let css = '';

    // Button styles
    css += `/* Button Styles */\n`;
    css += `.mod-cta {\n`;
    css += `  background-color: ${this.configuration.components.button.backgroundColor};\n`;
    css += `  color: ${this.configuration.components.button.textColor};\n`;
    css += `  border: 1px solid ${this.configuration.components.button.borderColor};\n`;
    css += `  border-radius: ${this.configuration.components.button.borderRadius};\n`;
    css += `}\n\n`;

    // Input styles
    css += `/* Input Styles */\n`;
    css += `input, textarea, select {\n`;
    css += `  background-color: ${this.configuration.components.input.backgroundColor};\n`;
    css += `  color: ${this.configuration.components.input.textColor};\n`;
    css += `  border: 1px solid ${this.configuration.components.input.borderColor};\n`;
    css += `}\n\n`;
    css += `input:focus, textarea:focus, select:focus {\n`;
    css += `  border-color: ${this.configuration.components.input.focusColor};\n`;
    css += `  outline: none;\n`;
    css += `}\n\n`;

    // Modal styles
    css += `/* Modal Styles */\n`;
    css += `.modal {\n`;
    css += `  background-color: ${this.configuration.components.modal.backgroundColor};\n`;
    css += `  border: 1px solid ${this.configuration.components.modal.borderColor};\n`;
    css += `  box-shadow: 0 4px 12px ${this.configuration.components.modal.shadowColor};\n`;
    css += `}\n\n`;

    return css;
  }

  /**
   * Export theme files
   */
  exportTheme(): ThemeExport {
    const validation = this.validateConfiguration();
    if (!validation.isValid) {
      throw new Error(`Theme validation failed: ${validation.errors.join(', ')}`);
    }

    const css = this.generateCSS();
    const variables = this.generateCSSVariables();

    return {
      manifest: this.configuration.manifest,
      css,
      variables
    };
  }

  /**
   * Export theme as downloadable files
   */
  exportThemeFiles(): { manifest: string; css: string } {
    const theme = this.exportTheme();
    
    const manifestContent = JSON.stringify(theme.manifest, null, 2);
    const cssContent = theme.css;

    return {
      manifest: manifestContent,
      css: cssContent
    };
  }

  /**
   * Import theme from files
   */
  importTheme(manifestContent: string, cssContent: string): void {
    try {
      const manifest = JSON.parse(manifestContent);
      
      // Basic validation of imported manifest
      if (!manifest.name || !manifest.author) {
        throw new Error('Invalid manifest: missing required fields');
      }

      // Update configuration with imported data
      this.configuration.manifest = manifest;
      
      // Note: Full CSS parsing and variable extraction would be more complex
      // For now, we'll just update the manifest and keep existing styling
      
    } catch (error) {
      throw new Error(`Failed to import theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Reset to default configuration
   */
  resetToDefault(): void {
    this.configuration = this.getDefaultConfiguration();
  }

  /**
   * Get theme preview data
   */
  getPreviewData(): { colors: Record<string, string>; typography: Record<string, string> } {
    return {
      colors: this.configuration.colors,
      typography: this.configuration.typography
    };
  }
}