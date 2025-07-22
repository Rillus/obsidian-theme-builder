import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import './DocumentationViewer.css';

interface DocumentationViewerProps {
  initialPath?: string;
}

interface DocFile {
  path: string;
  title: string;
  category: string;
}

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({ initialPath = 'docs/README.md' }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navigationOpen, setNavigationOpen] = useState(true);

  // Sample documentation structure - in a real app, this would be loaded from a config file
  const documentationFiles: DocFile[] = [
    { path: 'docs/README.md', title: 'Documentation Home', category: 'Overview' },
    { path: 'docs/guides/quick-start.md', title: 'Quick Start Guide', category: 'Guides' },
    { path: 'docs/guides/installation.md', title: 'Installation Guide', category: 'Guides' },
    { path: 'docs/features/color-palette.md', title: 'Color Palette Management', category: 'Features' },
    { path: 'docs/features/theme-customization.md', title: 'Theme Customization', category: 'Features' },
    { path: 'docs/features/export-import.md', title: 'Export & Import', category: 'Features' },
    { path: 'docs/features/live-preview.md', title: 'Live Preview', category: 'Features' },
    { path: 'docs/api/core.md', title: 'Core API', category: 'API' },
    { path: 'docs/api/color-utils.md', title: 'Color Utilities', category: 'API' },
    { path: 'docs/api/theme-generation.md', title: 'Theme Generation', category: 'API' },
    { path: 'docs/architecture/overview.md', title: 'System Overview', category: 'Architecture' },
    { path: 'docs/architecture/components.md', title: 'Component Architecture', category: 'Architecture' },
    { path: 'docs/architecture/state.md', title: 'State Management', category: 'Architecture' },
    { path: 'docs/architecture/data-flow.md', title: 'Data Flow', category: 'Architecture' },
  ];

  const loadDocumentation = async (path: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from the server
      // For now, we'll simulate loading the content
      const response = await fetch(`/${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load documentation: ${response.statusText}`);
      }
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documentation');
      // For demo purposes, show a placeholder if the file doesn't exist
      setContent(`# Documentation Not Found

The documentation file \`${path}\` could not be loaded.

This is expected behavior in the development environment. In a production build, the documentation files would be properly served.

## Available Documentation

${documentationFiles
  .map(file => `- [${file.title}](${file.path})`)
  .join('\n')}

## Creating Documentation

To create new documentation:

1. Add a markdown file to the \`docs/\` directory
2. Follow the Documentation Driven Design format
3. Update the navigation structure in \`DocumentationViewer.tsx\`
4. Test the documentation in the viewer`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocumentation(currentPath);
  }, [currentPath]);

  const handleNavigationClick = (path: string) => {
    setCurrentPath(path);
  };

  const groupedFiles = documentationFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, DocFile[]>);

  return (
    <div className="documentation-viewer">
      {/* Navigation Toggle */}
      <button
        className="nav-toggle"
        onClick={() => setNavigationOpen(!navigationOpen)}
        aria-label="Toggle navigation"
      >
        {navigationOpen ? '◀' : '▶'}
      </button>

      {/* Navigation Sidebar */}
      <div className={`documentation-nav ${navigationOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h3>Documentation</h3>
        </div>
        <nav className="nav-content">
          {Object.entries(groupedFiles).map(([category, files]) => (
            <div key={category} className="nav-section">
              <h4 className="nav-category">{category}</h4>
              <ul className="nav-list">
                {files.map((file) => (
                  <li key={file.path}>
                    <button
                      className={`nav-link ${currentPath === file.path ? 'active' : ''}`}
                      onClick={() => handleNavigationClick(file.path)}
                    >
                      {file.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="documentation-content">
        <div className="content-header">
          <h1 className="content-title">
            {documentationFiles.find(f => f.path === currentPath)?.title || 'Documentation'}
          </h1>
          <div className="content-path">{currentPath}</div>
        </div>
        
        <div className="content-body">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading documentation...</p>
            </div>
          ) : error ? (
            <div className="error">
              <h2>Error Loading Documentation</h2>
              <p>{error}</p>
            </div>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationViewer;