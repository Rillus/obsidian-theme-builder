import { useState } from 'react';
import DocumentationViewer from './components/DocumentationViewer';
import CSSVariablesDemo from './components/CSSVariablesDemo';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'docs' | 'app' | 'demo'>('docs');

  return (
    <div className="app">
      {/* Header with view toggle */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Obsidian Theme Builder</h1>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${currentView === 'docs' ? 'active' : ''}`}
              onClick={() => setCurrentView('docs')}
            >
              📚 Documentation
            </button>
            <button
              className={`toggle-btn ${currentView === 'app' ? 'active' : ''}`}
              onClick={() => setCurrentView('app')}
            >
              🎨 Theme Builder
            </button>
            <button
              className={`toggle-btn ${currentView === 'demo' ? 'active' : ''}`}
              onClick={() => setCurrentView('demo')}
            >
              🔧 CSS Variables Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {currentView === 'docs' ? (
          <DocumentationViewer />
        ) : currentView === 'demo' ? (
          <CSSVariablesDemo />
        ) : (
          <div className="theme-builder-placeholder">
            <h2>Theme Builder Interface</h2>
            <p>This is where the main theme builder interface will be implemented.</p>
            <p>Switch to Documentation view to see the Documentation Driven Design approach in action.</p>
            <p>Switch to CSS Variables Demo to see the complete CSS variables system in action.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
