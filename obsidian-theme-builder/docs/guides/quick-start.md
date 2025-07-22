# Quick Start Guide

## Overview

This guide will help you get started with the Obsidian Theme Builder in under 5 minutes. You'll learn how to create your first theme and understand the basic workflow.

## Usage

### Step 1: Launch the Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Browser**
   - Navigate to `http://localhost:5173`
   - You'll see the main interface with two tabs: "Documentation" and "Theme Builder"

3. **Switch to Theme Builder**
   - Click the "🎨 Theme Builder" button in the header
   - This opens the main theme creation interface

### Step 2: Create Your First Color Palette

1. **Open Color Palette Panel**
   - Click on the "Color Palette" tab in the sidebar
   - Or use the keyboard shortcut `Ctrl+Shift+P` (Cmd+Shift+P on Mac)

2. **Add Your First Color**
   - Click the "+" button to add a new color
   - Use the color picker to select a base color
   - Name it "Primary" for easy reference

3. **Generate Complementary Colors**
   - Select your primary color
   - Click "Generate Palette" 
   - Choose "Analogous" for a harmonious color scheme
   - The system will create 3-5 complementary colors

### Step 3: Customize Your Theme

1. **Apply Colors to Theme Elements**
   - Go to the "Theme Customization" tab
   - You'll see different Obsidian interface elements
   - Drag colors from your palette to apply them

2. **Preview Your Changes**
   - The "Live Preview" panel shows real-time updates
   - Toggle between light and dark mode to see both variants
   - Adjust colors until you're satisfied

### Step 4: Save and Export

1. **Save Your Theme**
   - Click "Save Theme" to store your work locally
   - Give your theme a memorable name
   - Add a description for future reference

2. **Export for Obsidian**
   - Click "Export" to generate the CSS file
   - Choose "Obsidian CSS" format
   - Copy the generated CSS to your Obsidian theme file

### Examples

#### Basic Workflow
```javascript
// Example: Creating a simple theme workflow
const themeWorkflow = {
  step1: "Create color palette with 3-5 colors",
  step2: "Apply colors to interface elements",
  step3: "Preview in both light and dark modes",
  step4: "Export as Obsidian CSS"
};
```

#### Color Palette Example
```css
/* Example: Generated Obsidian theme CSS */
.theme-light {
  --primary-color: #2E86AB;
  --secondary-color: #A23B72;
  --accent-color: #F18F01;
  --background-color: #F7F7F7;
  --text-color: #2C2C2C;
}

.theme-dark {
  --primary-color: #58A6FF;
  --secondary-color: #BC8CFF;
  --accent-color: #FFA657;
  --background-color: #0D1117;
  --text-color: #F0F6FC;
}
```

## Implementation

### Code Structure

The Quick Start workflow is implemented through several key components:

#### Core Workflow Components
- `QuickStartWizard` - Guides users through the initial setup
- `ColorPaletteManager` - Handles color creation and management
- `ThemePreview` - Shows real-time theme preview
- `ExportManager` - Handles theme export functionality

#### State Management
```typescript
interface QuickStartState {
  currentStep: number;
  colorPalette: Color[];
  themeSettings: ThemeSettings;
  isComplete: boolean;
}

interface ThemeSettings {
  name: string;
  description: string;
  colors: ColorMapping;
  mode: 'light' | 'dark' | 'both';
}
```

#### Key Functions
- `startQuickStart()` - Initialize the quick start workflow
- `nextStep()` - Move to the next step in the wizard
- `previousStep()` - Move to the previous step
- `completeQuickStart()` - Finish the setup process
- `exportTheme()` - Generate and download the theme file

### Dependencies

- **React Router**: For step-by-step navigation
- **Zustand**: For state management across components
- **Chroma.js**: For color manipulation and harmony generation
- **FileSaver.js**: For downloading generated theme files

### User Experience Flow

1. **Onboarding**: Welcome screen with project overview
2. **Color Selection**: Guided color palette creation
3. **Theme Application**: Visual interface for applying colors
4. **Preview**: Real-time preview with mode switching
5. **Export**: One-click theme generation and download

## API Reference

### QuickStartWizard

```typescript
class QuickStartWizard {
  // Start the quick start process
  start(): void;
  
  // Navigate to next step
  nextStep(): void;
  
  // Navigate to previous step
  previousStep(): void;
  
  // Complete the quick start
  complete(): Promise<void>;
  
  // Get current step information
  getCurrentStep(): StepInfo;
  
  // Check if user can proceed to next step
  canProceed(): boolean;
}
```

### Step Information

```typescript
interface StepInfo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired: boolean;
  component: React.ComponentType;
}
```

## Troubleshooting

### Common Issues

1. **Colors not appearing in preview**
   - Ensure you've saved your color palette
   - Check that colors are properly applied to theme elements
   - Refresh the preview panel

2. **Export not working**
   - Verify all required fields are filled
   - Check browser download permissions
   - Try a different browser if issues persist

3. **Performance issues**
   - Close other browser tabs
   - Reduce the number of colors in your palette
   - Restart the development server

### Getting Help

- Check the [Installation Guide](./installation.md) for setup issues
- Review the [Color Palette Management](./../features/color-palette.md) for advanced usage
- Consult the [API Reference](./../api/core.md) for technical details

## Next Steps

After completing the Quick Start Guide:

1. **Explore Advanced Features**
   - Learn about [Theme Customization](./../features/theme-customization.md)
   - Master [Color Palette Management](./../features/color-palette.md)
   - Try [Live Preview](./../features/live-preview.md) features

2. **Customize Your Workflow**
   - Set up keyboard shortcuts
   - Configure auto-save preferences
   - Create custom color harmony rules

3. **Share Your Themes**
   - Export themes for sharing
   - Import themes from the community
   - Contribute to the theme library