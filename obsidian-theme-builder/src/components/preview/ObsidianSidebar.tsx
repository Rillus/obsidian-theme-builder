import React, { useState } from 'react';
import './ObsidianSidebar.css';

interface ObsidianSidebarProps {
  collapsed: boolean;
}

const ObsidianSidebar: React.FC<ObsidianSidebarProps> = ({ collapsed }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'search' | 'graph' | 'backlinks'>('files');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Daily Notes', 'Projects']));

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  if (collapsed) {
    return (
      <div className="obsidian-sidebar collapsed">
        <div className="sidebar-tabs-vertical">
          <button 
            className={`sidebar-tab ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
            title="Files"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z"/>
            </svg>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
            title="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('graph')}
            title="Graph View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16,6l2.29,2.29l-4.88,4.88l-4-4L2,16.59L3.41,18l6-6l4,4l6.3-6.29L22,12V6z"/>
            </svg>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'backlinks' ? 'active' : ''}`}
            onClick={() => setActiveTab('backlinks')}
            title="Backlinks"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="obsidian-sidebar">
      {/* Sidebar tabs */}
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'graph' ? 'active' : ''}`}
          onClick={() => setActiveTab('graph')}
        >
          Graph
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'backlinks' ? 'active' : ''}`}
          onClick={() => setActiveTab('backlinks')}
        >
          Backlinks
        </button>
      </div>

      {/* Sidebar content */}
      <div className="sidebar-content">
        {activeTab === 'files' && (
          <div className="file-explorer">
            <div className="explorer-header">
              <h3>Files</h3>
              <button className="new-file-btn" title="New file">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            </div>
            
            <div className="file-tree">
              <div className="folder-item">
                <button 
                  className="folder-toggle"
                  onClick={() => toggleFolder('Daily Notes')}
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={expandedFolders.has('Daily Notes') ? 'expanded' : ''}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                  📅 Daily Notes
                </button>
                {expandedFolders.has('Daily Notes') && (
                  <div className="folder-content">
                    <div className="file-item">📄 2024-01-15.md</div>
                    <div className="file-item">📄 2024-01-16.md</div>
                    <div className="file-item active">📄 2024-01-17.md</div>
                  </div>
                )}
              </div>
              
              <div className="folder-item">
                <button 
                  className="folder-toggle"
                  onClick={() => toggleFolder('Projects')}
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={expandedFolders.has('Projects') ? 'expanded' : ''}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                  📁 Projects
                </button>
                {expandedFolders.has('Projects') && (
                  <div className="folder-content">
                    <div className="file-item">📄 Project A.md</div>
                    <div className="file-item">📄 Project B.md</div>
                    <div className="file-item">📄 Meeting Notes.md</div>
                  </div>
                )}
              </div>
              
              <div className="file-item">📄 Quick Capture.md</div>
              <div className="file-item">📄 Templates.md</div>
              <div className="file-item">📄 Archive.md</div>
            </div>
          </div>
        )}
        
        {activeTab === 'search' && (
          <div className="search-panel">
            <div className="search-input-container">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search in vault..."
                defaultValue="theme"
              />
            </div>
            <div className="search-results">
              <div className="search-result">
                <div className="result-title">My Note</div>
                <div className="result-preview">...custom <mark>theme</mark> for Obsidian...</div>
              </div>
              <div className="search-result">
                <div className="result-title">Theme Builder</div>
                <div className="result-preview">...building a <mark>theme</mark> editor...</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'graph' && (
          <div className="graph-panel">
            <div className="graph-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16,6l2.29,2.29l-4.88,4.88l-4-4L2,16.59L3.41,18l6-6l4,4l6.3-6.29L22,12V6z"/>
              </svg>
              <p>Graph View</p>
              <small>Visualize your knowledge graph</small>
            </div>
          </div>
        )}
        
        {activeTab === 'backlinks' && (
          <div className="backlinks-panel">
            <div className="backlinks-header">
              <h3>Backlinks</h3>
              <span className="backlink-count">3</span>
            </div>
            <div className="backlinks-list">
              <div className="backlink-item">
                <div className="backlink-title">Project A.md</div>
                <div className="backlink-context">...reference to this note in the project...</div>
              </div>
              <div className="backlink-item">
                <div className="backlink-title">Meeting Notes.md</div>
                <div className="backlink-context">...discussed this topic in the meeting...</div>
              </div>
              <div className="backlink-item">
                <div className="backlink-title">Daily Notes/2024-01-16.md</div>
                <div className="backlink-context">...mentioned in yesterday's notes...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObsidianSidebar;