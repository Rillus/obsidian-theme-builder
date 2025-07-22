import React from 'react';
import './PreviewControls.css';

interface PreviewControlsProps {
  previewMode: 'editor' | 'reading' | 'settings';
  onPreviewModeChange: (mode: 'editor' | 'reading' | 'settings') => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({
  previewMode,
  onPreviewModeChange,
  isDarkMode,
  onDarkModeToggle
}) => {
  return (
    <div className="preview-controls">
      <div className="controls-section">
        <h4>Preview Mode</h4>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${previewMode === 'editor' ? 'active' : ''}`}
            onClick={() => onPreviewModeChange('editor')}
            title="Editor View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6"/>
              <path d="M16 13H8"/>
              <path d="M16 17H8"/>
              <path d="M10 9H8"/>
            </svg>
            Editor
          </button>
          <button
            className={`mode-btn ${previewMode === 'reading' ? 'active' : ''}`}
            onClick={() => onPreviewModeChange('reading')}
            title="Reading View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6"/>
              <path d="M16 13H8"/>
              <path d="M16 17H8"/>
              <path d="M10 9H8"/>
            </svg>
            Reading
          </button>
          <button
            className={`mode-btn ${previewMode === 'settings' ? 'active' : ''}`}
            onClick={() => onPreviewModeChange('settings')}
            title="Settings View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Settings
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <h4>Theme Mode</h4>
        <div className="theme-toggle">
          <button
            className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
            onClick={onDarkModeToggle}
            title="Light Mode"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"/>
            </svg>
            Light
          </button>
          <button
            className={`theme-btn ${isDarkMode ? 'active' : ''}`}
            onClick={onDarkModeToggle}
            title="Dark Mode"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
            Dark
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewControls;