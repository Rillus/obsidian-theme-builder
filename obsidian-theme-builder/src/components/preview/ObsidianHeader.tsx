import React from 'react';
import './ObsidianHeader.css';

const ObsidianHeader: React.FC = () => {
  return (
    <header className="obsidian-header">
      <div className="header-left">
        <div className="app-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="app-name">Obsidian</span>
      </div>
      
      <div className="header-center">
        <div className="file-tabs">
          <div className="file-tab active">
            <span className="file-name">Welcome.md</span>
            <button className="tab-close">×</button>
          </div>
          <div className="file-tab">
            <span className="file-name">Getting Started.md</span>
            <button className="tab-close">×</button>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        <div className="toolbar">
          <button className="toolbar-btn" title="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
          <button className="toolbar-btn" title="Graph View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 3v1m6-1v1M9 19v1m6-1v1M5 9H4m1-6H4m1 18H4m18-9h-1m-6 6v-1m0-16v-1m0 18v-1m0-16v-1m-6 6h1m-1 6h1m6-6h1m-1 6h1"/>
            </svg>
          </button>
          <button className="toolbar-btn" title="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ObsidianHeader;