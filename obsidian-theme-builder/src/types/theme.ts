// Theme data interfaces for Obsidian Theme Builder

export interface ThemeManifest {
  name: string;
  version: string;
  author: string;
  description: string;
  minAppVersion: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  shadow: string;
}

export interface TypographySettings {
  fontFamily: string;
  fontFamilyMono: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontWeightBold: string;
}

export interface SpacingSettings {
  spacing: string;
  borderRadius: string;
  borderWidth: string;
}

export interface LayoutSettings {
  sidebarWidth: string;
  headerHeight: string;
  contentPadding: string;
}

export interface ComponentSettings {
  button: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: string;
  };
  input: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    focusColor: string;
  };
  modal: {
    backgroundColor: string;
    borderColor: string;
    shadowColor: string;
  };
}

export interface ThemeConfiguration {
  manifest: ThemeManifest;
  colors: ColorPalette;
  typography: TypographySettings;
  spacing: SpacingSettings;
  layout: LayoutSettings;
  components: ComponentSettings;
  mode: 'light' | 'dark';
}

export interface CSSVariable {
  name: string;
  value: string;
  category: string;
  description: string;
  defaultValue: string;
}

export interface ThemeExport {
  manifest: ThemeManifest;
  css: string;
  variables: CSSVariable[];
}