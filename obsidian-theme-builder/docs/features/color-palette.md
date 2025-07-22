# Color Palette Management

## Overview

The Color Palette Management feature allows users to create, edit, and manage color schemes for Obsidian themes. This feature provides an intuitive interface for selecting colors, generating complementary palettes, and previewing how colors will look in the final theme.

## Usage

### Creating a New Color Palette

1. **Open the Color Palette Panel**
   - Click on the "Color Palette" tab in the main interface
   - Or use the keyboard shortcut `Ctrl+Shift+P` (Cmd+Shift+P on Mac)

2. **Add Base Colors**
   - Click the "+" button to add a new color
   - Use the color picker to select your desired color
   - Name your color for easy reference (e.g., "Primary Blue", "Accent Orange")

3. **Generate Complementary Colors**
   - Select a base color
   - Click "Generate Palette" to create complementary colors
   - Choose from different harmony rules: Analogous, Triadic, Complementary, etc.

### Managing Color Palettes

- **Save Palette**: Click "Save Palette" to store your current color scheme
- **Load Palette**: Use "Load Palette" to restore previously saved palettes
- **Export Palette**: Export your palette as CSS variables or JSON
- **Import Palette**: Import palettes from other sources

### Examples

#### Basic Color Selection
```javascript
// Example: Creating a simple color palette
const palette = {
  primary: '#2E86AB',    // Ocean Blue
  secondary: '#A23B72',  // Deep Purple
  accent: '#F18F01',     // Warm Orange
  background: '#F7F7F7', // Light Gray
  text: '#2C2C2C'        // Dark Gray
};
```

#### Generating Complementary Colors
```javascript
// Example: Using the color harmony API
const baseColor = '#2E86AB';
const complementary = generateComplementary(baseColor);
const analogous = generateAnalogous(baseColor, 3);
const triadic = generateTriadic(baseColor);
```

## Implementation

### Code Structure

The Color Palette Management feature consists of several key components:

#### Core Components
- `ColorPalettePanel` - Main container for the color palette interface
- `ColorPicker` - Individual color selection component
- `PaletteGenerator` - Tool for generating complementary colors
- `PaletteManager` - Handles saving/loading of palettes

#### State Management
```typescript
interface ColorPaletteState {
  colors: Color[];
  selectedColor: Color | null;
  paletteHistory: ColorPalette[];
  currentPalette: ColorPalette;
}

interface Color {
  id: string;
  name: string;
  hex: string;
  rgb: RGB;
  hsl: HSL;
}
```

#### Key Functions
- `addColor(color: Color)` - Add a new color to the palette
- `removeColor(colorId: string)` - Remove a color from the palette
- `updateColor(colorId: string, updates: Partial<Color>)` - Update color properties
- `generateHarmony(baseColor: string, type: HarmonyType)` - Generate complementary colors
- `savePalette(name: string)` - Save current palette
- `loadPalette(paletteId: string)` - Load a saved palette

### Dependencies

- **chroma-js**: For color manipulation and harmony generation
- **zustand**: For state management
- **react-colorful**: For color picker component
- **react-markdown**: For rendering documentation

### Color Harmony Algorithms

The system implements several color harmony algorithms:

1. **Complementary**: Colors opposite on the color wheel
2. **Analogous**: Colors adjacent on the color wheel
3. **Triadic**: Three colors equally spaced on the color wheel
4. **Split-Complementary**: One base color plus two colors adjacent to its complement
5. **Monochromatic**: Variations of a single color

## API Reference

### ColorPaletteManager

```typescript
class ColorPaletteManager {
  // Add a new color to the palette
  addColor(color: Color): void;
  
  // Remove a color from the palette
  removeColor(colorId: string): void;
  
  // Update color properties
  updateColor(colorId: string, updates: Partial<Color>): void;
  
  // Generate complementary colors
  generateHarmony(baseColor: string, type: HarmonyType): Color[];
  
  // Save current palette
  savePalette(name: string): Promise<void>;
  
  // Load a saved palette
  loadPalette(paletteId: string): Promise<ColorPalette>;
  
  // Export palette as CSS variables
  exportAsCSS(): string;
  
  // Export palette as JSON
  exportAsJSON(): string;
}
```

### Color Utilities

```typescript
// Convert between color formats
function hexToRgb(hex: string): RGB;
function rgbToHex(rgb: RGB): string;
function hexToHsl(hex: string): HSL;
function hslToHex(hsl: HSL): string;

// Color manipulation
function lighten(color: string, amount: number): string;
function darken(color: string, amount: number): string;
function saturate(color: string, amount: number): string;
function desaturate(color: string, amount: number): string;

// Color analysis
function getContrastRatio(color1: string, color2: string): number;
function isAccessible(color1: string, color2: string): boolean;
function getLuminance(color: string): number;
```

## Accessibility Considerations

- All color combinations are tested for WCAG AA compliance
- High contrast mode support
- Colorblind-friendly palette generation options
- Keyboard navigation support for all color picker interactions

## Performance Optimizations

- Color calculations are memoized to prevent unnecessary recalculations
- Large palettes are virtualized for smooth scrolling
- Color picker updates are debounced to prevent excessive re-renders
- Palette history is limited to prevent memory bloat