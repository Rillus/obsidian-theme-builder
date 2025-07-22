import { useState } from 'react';
import DocumentationViewer from './components/DocumentationViewer';
import ThemeBuilder from './components/ThemeBuilder';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'docs' | 'app'>('app');

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
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {currentView === 'docs' ? (
          <DocumentationViewer />
        ) : (
          <ThemeBuilder />
        )}
      </main>
    </div>
  );
}

export default App;
