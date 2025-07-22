import React from 'react';
import './ObsidianSidebar.css';

const ObsidianSidebar: React.FC = () => {
  return (
    <aside className="obsidian-sidebar">
      <div className="sidebar-header">
        <h3>Files</h3>
        <button className="sidebar-btn" title="New note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5v14m-7-7h14"/>
          </svg>
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="file-tree">
          <div className="folder-item">
            <div className="folder-header">
              <svg className="folder-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <span className="folder-name">Getting Started</span>
            </div>
            <div className="folder-content">
              <div className="file-item active">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">Welcome.md</span>
              </div>
              <div className="file-item">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">Getting Started.md</span>
              </div>
            </div>
          </div>
          
          <div className="folder-item">
            <div className="folder-header">
              <svg className="folder-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <span className="folder-name">Projects</span>
            </div>
            <div className="folder-content">
              <div className="file-item">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">Project A.md</span>
              </div>
              <div className="file-item">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">Project B.md</span>
              </div>
            </div>
          </div>
          
          <div className="folder-item">
            <div className="folder-header">
              <svg className="folder-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <span className="folder-name">Daily Notes</span>
            </div>
            <div className="folder-content">
              <div className="file-item">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">2024-01-15.md</span>
              </div>
              <div className="file-item">
                <svg className="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                <span className="file-name">2024-01-16.md</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="search-box">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search files..." 
            className="search-input"
          />
        </div>
      </div>
    </aside>
  );
};

export default ObsidianSidebar;