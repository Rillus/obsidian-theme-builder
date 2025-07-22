import React from 'react';
import './ObsidianEditor.css';

interface ObsidianEditorProps {
  mode: 'editor' | 'reading' | 'settings';
}

const ObsidianEditor: React.FC<ObsidianEditorProps> = ({ mode }) => {
  if (mode === 'reading') {
    return (
      <div className="obsidian-editor reading-mode">
        <div className="editor-content">
          <div className="reading-content">
            <h1>My Note</h1>
            <p>This is a sample note in reading mode. The content is displayed as rendered markdown with proper styling.</p>
            
            <h2>Features</h2>
            <ul>
              <li>Real-time theme preview</li>
              <li>Custom color schemes</li>
              <li>Typography customization</li>
              <li>Component styling</li>
            </ul>
            
            <h3>Code Example</h3>
            <pre><code>// This is a code block
function createTheme() {
  return {
    colors: {
      primary: '#007acc',
      background: '#1e1e1e'
    }
  };
}</code></pre>
            
            <blockquote>
              <p>This is a blockquote that demonstrates how quoted text appears in the theme.</p>
            </blockquote>
            
            <h2>Links and References</h2>
            <p>You can create <a href="#internal-link">internal links</a> and reference other notes in your vault.</p>
            
            <div className="callout">
              <div className="callout-title">💡 Tip</div>
              <div className="callout-content">
                This is a callout block that can be used to highlight important information or tips.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'settings') {
    return (
      <div className="obsidian-editor settings-mode">
        <div className="settings-content">
          <div className="settings-section">
            <h2>Appearance</h2>
            <div className="setting-item">
              <label>Theme</label>
              <select className="setting-input">
                <option>Dark</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Font Size</label>
              <input type="range" className="setting-slider" min="12" max="24" defaultValue="14" />
              <span className="setting-value">14px</span>
            </div>
            <div className="setting-item">
              <label>Line Width</label>
              <input type="range" className="setting-slider" min="40" max="120" defaultValue="80" />
              <span className="setting-value">80</span>
            </div>
          </div>
          
          <div className="settings-section">
            <h2>Editor</h2>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Show line numbers
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Auto-save
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                Spell check
              </label>
            </div>
          </div>
          
          <div className="settings-section">
            <h2>Plugins</h2>
            <div className="plugin-list">
              <div className="plugin-item">
                <div className="plugin-info">
                  <div className="plugin-name">Calendar</div>
                  <div className="plugin-description">Add a calendar view to your vault</div>
                </div>
                <label className="plugin-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="plugin-item">
                <div className="plugin-info">
                  <div className="plugin-name">Graph View</div>
                  <div className="plugin-description">Visualize your knowledge graph</div>
                </div>
                <label className="plugin-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="plugin-item">
                <div className="plugin-info">
                  <div className="plugin-name">Templates</div>
                  <div className="plugin-description">Create and use note templates</div>
                </div>
                <label className="plugin-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="obsidian-editor">
      <div className="editor-content">
        <div className="editor-textarea">
          <textarea 
            defaultValue={`# My Note

This is a sample note in editor mode. You can see how the markdown syntax highlighting and editor styling looks with the current theme.

## Features

- Real-time theme preview
- Custom color schemes  
- Typography customization
- Component styling

## Code Example

\`\`\`javascript
// This is a code block
function createTheme() {
  return {
    colors: {
      primary: '#007acc',
      background: '#1e1e1e'
    }
  };
}
\`\`\`

> This is a blockquote that demonstrates how quoted text appears in the theme.

## Links and References

You can create [[internal links]] and reference other notes in your vault.

> [!tip] Tip
> This is a callout block that can be used to highlight important information or tips.

---

*Last modified: 2024-01-17*`}
            placeholder="Start writing your note..."
          />
        </div>
      </div>
    </div>
  );
};

export default ObsidianEditor;