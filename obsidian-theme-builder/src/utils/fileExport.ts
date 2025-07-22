import type { ThemeExport } from '../types/theme';

/**
 * Download a file with the given content and filename
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

/**
 * Export theme as downloadable files
 */
export function exportThemeFiles(theme: ThemeExport, _themeName: string): void {
  // Sanitize theme name for filename (unused in this function)
  // const sanitizedName = themeName.replace(/[^a-zA-Z0-9-_]/g, '_');
  
  // Export manifest.json
  const manifestContent = JSON.stringify(theme.manifest, null, 2);
  downloadFile(manifestContent, 'manifest.json', 'application/json');
  
  // Export theme.css
  downloadFile(theme.css, 'theme.css', 'text/css');
}

/**
 * Export theme as a zip file (if JSZip is available)
 */
export async function exportThemeAsZip(theme: ThemeExport, themeName: string): Promise<void> {
  try {
    // Dynamic import of JSZip to avoid bundling it if not needed
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Sanitize theme name for filename
    const sanitizedName = themeName.replace(/[^a-zA-Z0-9-_]/g, '_');
    
    // Add manifest.json
    zip.file('manifest.json', JSON.stringify(theme.manifest, null, 2));
    
    // Add theme.css
    zip.file('theme.css', theme.css);
    
    // Generate and download zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizedName}-theme.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to create zip file:', error);
    // Fallback to individual files
    exportThemeFiles(theme, themeName);
  }
}

/**
 * Import theme files from file input
 */
export function importThemeFiles(
  manifestFile: File, 
  cssFile: File
): Promise<{ manifest: string; css: string }> {
  return new Promise((resolve, reject) => {
    const manifestReader = new FileReader();
    const cssReader = new FileReader();
    
    let manifestContent: string | null = null;
    let cssContent: string | null = null;
    
    const checkComplete = () => {
      if (manifestContent && cssContent) {
        resolve({ manifest: manifestContent, css: cssContent });
      }
    };
    
    manifestReader.onload = (e) => {
      manifestContent = e.target?.result as string;
      checkComplete();
    };
    
    cssReader.onload = (e) => {
      cssContent = e.target?.result as string;
      checkComplete();
    };
    
    manifestReader.onerror = () => reject(new Error('Failed to read manifest file'));
    cssReader.onerror = () => reject(new Error('Failed to read CSS file'));
    
    manifestReader.readAsText(manifestFile);
    cssReader.readAsText(cssFile);
  });
}

/**
 * Validate file types for import
 */
export function validateImportFiles(manifestFile: File, cssFile: File): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check file types
  if (manifestFile.type !== 'application/json' && !manifestFile.name.endsWith('.json')) {
    errors.push('Manifest file must be a JSON file');
  }
  
  if (cssFile.type !== 'text/css' && !cssFile.name.endsWith('.css')) {
    errors.push('CSS file must be a CSS file');
  }
  
  // Check file sizes (reasonable limits)
  if (manifestFile.size > 1024 * 10) { // 10KB
    errors.push('Manifest file is too large (max 10KB)');
  }
  
  if (cssFile.size > 1024 * 100) { // 100KB
    errors.push('CSS file is too large (max 100KB)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}