import React from 'react';
import './ObsidianEditor.css';

interface ObsidianEditorProps {
  mode?: 'editor' | 'reading' | 'settings';
}

const ObsidianEditor: React.FC<ObsidianEditorProps> = ({ mode = 'editor' }) => {
  const sampleContent = `# Welcome to Obsidian

This is your **personal knowledge base** where you can store and organize your thoughts, ideas, and information.

## Getting Started

1. **Create your first note** - Click the "New note" button in the sidebar
2. **Link your notes** - Use [[double brackets]] to create links between notes
3. **Use markdown** - Format your notes with headers, lists, and more

## Features

- **Graph View** - Visualize connections between your notes
- **Backlinks** - See which notes link to the current one
- **Tags** - Organize notes with #tags
- **Search** - Find anything quickly with global search

## Example Content

Here's some sample content to demonstrate the theme:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

> This is a blockquote that shows how quoted text appears in your theme.

### Lists

- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

1. Numbered item
2. Another numbered item
3. Third item

---

*This is italic text* and **this is bold text**. You can also use ***bold italic*** text.

## Links and References

- [External Link](https://obsidian.md)
- [[Internal Link]]
- [[Another Note|Custom Link Text]]

\`\`\`css
/* This is a code block showing CSS */
.theme-example {
  color: var(--color-primary);
  background: var(--color-background);
  font-family: var(--font-family);
}
\`\`\`

---

*Last updated: January 2024*`;

  const settingsContent = `# Settings

## Appearance

### Theme
- [x] Dark theme
- [ ] Light theme
- [ ] System theme

### Font
- Font family: Inter
- Font size: 14px
- Line height: 1.6

## Editor

### Markdown
- [x] Auto-pair brackets
- [x] Auto-pair markdown
- [ ] Live preview

### Spell check
- [x] Enable spell check
- Language: English (US)

## Files & Links

### New file location
- [x] Same folder as current file
- [ ] Vault root
- [ ] Custom folder

### Default view mode
- [x] Editing
- [ ] Reading
- [ ] Source`;

  const renderContent = () => {
    switch (mode) {
      case 'settings':
        return (
          <div className="settings-content">
            <div className="settings-section">
              <h2>Appearance</h2>
              <div className="setting-item">
                <label>Theme</label>
                <div className="setting-controls">
                  <label className="checkbox">
                    <input type="checkbox" defaultChecked />
                    <span>Dark theme</span>
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span>Light theme</span>
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span>System theme</span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <label>Font</label>
                <div className="setting-controls">
                  <select className="setting-select">
                    <option>Inter</option>
                    <option>Segoe UI</option>
                    <option>Roboto</option>
                  </select>
                  <input type="number" className="setting-input" defaultValue="14" />
                  <input type="number" className="setting-input" defaultValue="1.6" step="0.1" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'reading':
        return (
          <div className="reading-content">
            <div className="markdown-content">
              <h1>Welcome to Obsidian</h1>
              <p>This is your <strong>personal knowledge base</strong> where you can store and organize your thoughts, ideas, and information.</p>
              <h2>Getting Started</h2>
              <ol>
                <li><strong>Create your first note</strong> - Click the "New note" button in the sidebar</li>
                <li><strong>Link your notes</strong> - Use [[double brackets]] to create links between notes</li>
                <li><strong>Use markdown</strong> - Format your notes with headers, lists, and more</li>
              </ol>
              <h2>Features</h2>
              <ul>
                <li><strong>Graph View</strong> - Visualize connections between your notes</li>
                <li><strong>Backlinks</strong> - See which notes link to the current one</li>
                <li><strong>Tags</strong> - Organize notes with #tags</li>
                <li><strong>Search</strong> - Find anything quickly with global search</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="editor-content">
            <textarea 
              className="markdown-editor"
              defaultValue={sampleContent}
              placeholder="Start writing your note..."
            />
          </div>
        );
    }
  };

  return (
    <main className="obsidian-editor">
      <div className="editor-container">
        {renderContent()}
      </div>
    </main>
  );
};

export default ObsidianEditor;