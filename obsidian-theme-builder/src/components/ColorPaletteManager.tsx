import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import AdvancedColorPicker from './AdvancedColorPicker';
import './ColorPaletteManager.css';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  description?: string;
  createdAt: Date;
  isDefault?: boolean;
}

interface ColorPaletteManagerProps {
  onPaletteSelect?: (colors: string[]) => void;
  currentColors?: Record<string, string>;
}

const ColorPaletteManager: React.FC<ColorPaletteManagerProps> = ({
  onPaletteSelect,
  currentColors = {}
}) => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPalette, setNewPalette] = useState<Partial<ColorPalette>>({
    name: '',
    description: '',
    colors: ['#007acc', '#6c757d', '#28a745', '#dc3545', '#ffc107']
  });

  // Load palettes from localStorage on mount
  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = () => {
    try {
      const savedPalettes = localStorage.getItem('obsidian-theme-palettes');
      if (savedPalettes) {
        const parsed = JSON.parse(savedPalettes);
        setPalettes(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      } else {
        // Create default palettes
        const defaultPalettes: ColorPalette[] = [
          {
            id: 'obsidian-dark',
            name: 'Obsidian Dark',
            description: 'Default dark theme for Obsidian',
            colors: ['#1e1e1e', '#2d2d2d', '#007acc', '#ffffff', '#b0b0b0'],
            createdAt: new Date(),
            isDefault: true
          },
          {
            id: 'obsidian-light',
            name: 'Obsidian Light',
            description: 'Default light theme for Obsidian',
            colors: ['#ffffff', '#f8f9fa', '#007acc', '#212529', '#6c757d'],
            createdAt: new Date(),
            isDefault: true
          },
          {
            id: 'github-dark',
            name: 'GitHub Dark',
            description: 'GitHub dark theme colors',
            colors: ['#0d1117', '#161b22', '#58a6ff', '#f0f6fc', '#7d8590'],
            createdAt: new Date(),
            isDefault: true
          },
          {
            id: 'github-light',
            name: 'GitHub Light',
            description: 'GitHub light theme colors',
            colors: ['#ffffff', '#f6f8fa', '#0969da', '#24292f', '#656d76'],
            createdAt: new Date(),
            isDefault: true
          }
        ];
        setPalettes(defaultPalettes);
        savePalettes(defaultPalettes);
      }
    } catch (error) {
      console.error('Failed to load palettes:', error);
    }
  };

  const savePalettes = (palettesToSave: ColorPalette[]) => {
    try {
      localStorage.setItem('obsidian-theme-palettes', JSON.stringify(palettesToSave));
    } catch (error) {
      console.error('Failed to save palettes:', error);
    }
  };

  const createPalette = () => {
    if (!newPalette.name || !newPalette.colors) return;

    const palette: ColorPalette = {
      id: `palette-${Date.now()}`,
      name: newPalette.name,
      description: newPalette.description || '',
      colors: newPalette.colors,
      createdAt: new Date()
    };

    const updatedPalettes = [...palettes, palette];
    setPalettes(updatedPalettes);
    savePalettes(updatedPalettes);
    setShowCreateModal(false);
    setNewPalette({
      name: '',
      description: '',
      colors: ['#007acc', '#6c757d', '#28a745', '#dc3545', '#ffc107']
    });
  };

  const deletePalette = (id: string) => {
    const updatedPalettes = palettes.filter(p => p.id !== id);
    setPalettes(updatedPalettes);
    savePalettes(updatedPalettes);
    if (selectedPalette === id) {
      setSelectedPalette(null);
    }
  };

  const updatePaletteColor = (paletteId: string, colorIndex: number, color: string) => {
    const updatedPalettes = palettes.map(palette => {
      if (palette.id === paletteId) {
        const newColors = [...palette.colors];
        newColors[colorIndex] = color;
        return { ...palette, colors: newColors };
      }
      return palette;
    });
    setPalettes(updatedPalettes);
    savePalettes(updatedPalettes);
  };

  const applyPalette = (palette: ColorPalette) => {
    setSelectedPalette(palette.id);
    if (onPaletteSelect) {
      onPaletteSelect(palette.colors);
    }
  };

  const generatePaletteFromCurrent = () => {
    const currentColorArray = Object.values(currentColors);
    if (currentColorArray.length === 0) return;

    setNewPalette({
      name: 'Current Theme',
      description: 'Generated from current theme colors',
      colors: currentColorArray.slice(0, 5) // Take first 5 colors
    });
    setShowCreateModal(true);
  };

  const generateRandomPalette = () => {
    const randomColors = Array.from({ length: 5 }, () => {
      return chroma.random().hex();
    });
    
    setNewPalette({
      name: 'Random Palette',
      description: 'Generated random color palette',
      colors: randomColors
    });
    setShowCreateModal(true);
  };

  const exportPalette = (palette: ColorPalette) => {
    const data = {
      name: palette.name,
      description: palette.description,
      colors: palette.colors,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.colors && Array.isArray(data.colors)) {
          setNewPalette({
            name: data.name || 'Imported Palette',
            description: data.description || 'Imported color palette',
            colors: data.colors
          });
          setShowCreateModal(true);
        }
      } catch (error) {
        console.error('Failed to import palette:', error);
        alert('Failed to import palette. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="color-palette-manager">
      <div className="palette-header">
        <h3>Color Palettes</h3>
        <div className="palette-actions">
          <button
            className="btn btn-secondary"
            onClick={generatePaletteFromCurrent}
            disabled={Object.keys(currentColors).length === 0}
          >
            📋 From Current
          </button>
          <button
            className="btn btn-secondary"
            onClick={generateRandomPalette}
          >
            🎲 Random
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ New Palette
          </button>
        </div>
      </div>

      <div className="palette-grid">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className={`palette-card ${selectedPalette === palette.id ? 'selected' : ''}`}
          >
            <div className="palette-header">
              <h4>{palette.name}</h4>
              {!palette.isDefault && (
                <button
                  className="btn-icon"
                  onClick={() => deletePalette(palette.id)}
                  title="Delete palette"
                >
                  🗑️
                </button>
              )}
            </div>
            
            {palette.description && (
              <p className="palette-description">{palette.description}</p>
            )}
            
            <div className="palette-colors">
              {palette.colors.map((color, index) => (
                <div key={index} className="palette-color-container">
                  <div
                    className="palette-color"
                    style={{ backgroundColor: color }}
                    title={`${color} - Click to edit`}
                    onClick={() => updatePaletteColor(palette.id, index, color)}
                  />
                  {!palette.isDefault && (
                    <AdvancedColorPicker
                      value={color}
                      onChange={(newColor) => updatePaletteColor(palette.id, index, newColor)}
                      label=""
                      showHarmony={false}
                      showAccessibility={false}
                      showFormats={false}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="palette-footer">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => applyPalette(palette)}
              >
                Apply
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => exportPalette(palette)}
              >
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Import Palette */}
      <div className="import-section">
        <label className="import-label">
          <input
            type="file"
            accept=".json"
            onChange={importPalette}
            style={{ display: 'none' }}
          />
          📁 Import Palette
        </label>
      </div>

      {/* Create Palette Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Palette</h3>
            
            <div className="form-group">
              <label>Palette Name</label>
              <input
                type="text"
                value={newPalette.name}
                onChange={(e) => setNewPalette({ ...newPalette, name: e.target.value })}
                placeholder="Enter palette name"
              />
            </div>
            
            <div className="form-group">
              <label>Description (optional)</label>
              <textarea
                value={newPalette.description}
                onChange={(e) => setNewPalette({ ...newPalette, description: e.target.value })}
                placeholder="Enter description"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label>Colors</label>
              <div className="color-inputs">
                {newPalette.colors?.map((color, index) => (
                  <AdvancedColorPicker
                    key={index}
                    value={color}
                    onChange={(newColor) => {
                      const newColors = [...(newPalette.colors || [])];
                      newColors[index] = newColor;
                      setNewPalette({ ...newPalette, colors: newColors });
                    }}
                    label={`Color ${index + 1}`}
                    showHarmony={false}
                    showAccessibility={false}
                    showFormats={false}
                  />
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={createPalette}
                disabled={!newPalette.name}
              >
                Create Palette
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteManager;