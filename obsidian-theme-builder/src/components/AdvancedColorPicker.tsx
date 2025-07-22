import React, { useState, useRef, useEffect } from 'react';
import chroma from 'chroma-js';
import { 
  getContrastRatio, 
  meetsContrastRequirements,
  isLightColor 
} from '../utils/colorUtils';
import './AdvancedColorPicker.css';

interface AdvancedColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  showHarmony?: boolean;
  showAccessibility?: boolean;
  showFormats?: boolean;
}

interface ColorFormat {
  name: string;
  value: string;
  label: string;
}

interface ColorHarmony {
  name: string;
  colors: string[];
  description: string;
}

const AdvancedColorPicker: React.FC<AdvancedColorPickerProps> = ({
  value,
  onChange,
  label = 'Color',
  showHarmony = true,
  showAccessibility = true,
  showFormats = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'hex' | 'rgb' | 'hsl' | 'oklch'>('hex');
  const [formatValue, setFormatValue] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  // Color formats
  const colorFormats: ColorFormat[] = [
    { name: 'hex', value: value, label: 'HEX' },
    { name: 'rgb', value: chroma(value).css('rgb'), label: 'RGB' },
    { name: 'hsl', value: chroma(value).css('hsl'), label: 'HSL' },
    { name: 'oklch', value: chroma(value).css('oklch'), label: 'OKLCH' }
  ];

  // Color harmonies
  const generateHarmonies = (baseColor: string): ColorHarmony[] => {
    const color = chroma(baseColor);
    return [
      {
        name: 'Monochromatic',
        colors: [
          color.luminance(0.1).hex(),
          color.luminance(0.3).hex(),
          color.luminance(0.5).hex(),
          color.luminance(0.7).hex(),
          color.luminance(0.9).hex()
        ],
        description: 'Variations of the same hue'
      },
      {
        name: 'Complementary',
        colors: [
          baseColor,
          color.set('hsl.h', (color.get('hsl.h') + 180) % 360).hex()
        ],
        description: 'Opposite colors on the color wheel'
      },
      {
        name: 'Triadic',
        colors: [
          baseColor,
          color.set('hsl.h', (color.get('hsl.h') + 120) % 360).hex(),
          color.set('hsl.h', (color.get('hsl.h') + 240) % 360).hex()
        ],
        description: 'Three colors equally spaced on the wheel'
      },
      {
        name: 'Analogous',
        colors: [
          color.set('hsl.h', (color.get('hsl.h') - 30 + 360) % 360).hex(),
          baseColor,
          color.set('hsl.h', (color.get('hsl.h') + 30) % 360).hex()
        ],
        description: 'Adjacent colors on the color wheel'
      }
    ];
  };

  // Popular color presets
  const colorPresets = [
    { name: 'Obsidian Dark', colors: ['#1e1e1e', '#2d2d2d', '#007acc', '#ffffff', '#b0b0b0'] },
    { name: 'Obsidian Light', colors: ['#ffffff', '#f8f9fa', '#007acc', '#212529', '#6c757d'] },
    { name: 'GitHub Dark', colors: ['#0d1117', '#161b22', '#58a6ff', '#f0f6fc', '#7d8590'] },
    { name: 'GitHub Light', colors: ['#ffffff', '#f6f8fa', '#0969da', '#24292f', '#656d76'] },
    { name: 'VS Code Dark', colors: ['#1e1e1e', '#252526', '#007acc', '#cccccc', '#6a9955'] },
    { name: 'VS Code Light', colors: ['#ffffff', '#f3f3f3', '#007acc', '#1e1e1e', '#267f99'] }
  ];

  // Update format value when color changes
  useEffect(() => {
    updateFormatValue();
  }, [value, activeFormat]);

  const updateFormatValue = () => {
    try {
      const color = chroma(value);
      switch (activeFormat) {
        case 'hex':
          setFormatValue(color.hex());
          break;
        case 'rgb':
          setFormatValue(color.css('rgb'));
          break;
        case 'hsl':
          setFormatValue(color.css('hsl'));
          break;
        case 'oklch':
          setFormatValue(color.css('oklch'));
          break;
      }
    } catch (error) {
      setFormatValue(value);
    }
  };

  const handleFormatChange = (newValue: string) => {
    setFormatValue(newValue);
    try {
      const newColor = chroma(newValue);
      onChange(newColor.hex());
    } catch (error) {
      // Invalid color format, keep current value
    }
  };

  const handlePresetClick = (preset: typeof colorPresets[0]) => {
    // Apply the first color from the preset
    onChange(preset.colors[0]);
  };

  const handleHarmonyClick = (color: string) => {
    onChange(color);
  };

  // Accessibility check
  const getAccessibilityInfo = () => {
    const isLight = isLightColor(value);
    const contrastWithWhite = getContrastRatio(value, '#ffffff');
    const contrastWithBlack = getContrastRatio(value, '#000000');
    const meetsAAWhite = meetsContrastRequirements(value, '#ffffff', 'AA');
    const meetsAABlack = meetsContrastRequirements(value, '#000000', 'AA');
    
    return {
      isLight,
      contrastWithWhite,
      contrastWithBlack,
      meetsAAWhite,
      meetsAABlack,
      suggestedTextColor: contrastWithWhite > contrastWithBlack ? '#ffffff' : '#000000'
    };
  };

  const accessibilityInfo = getAccessibilityInfo();

  return (
    <div className="advanced-color-picker" ref={pickerRef}>
      <div className="picker-header">
        <label className="picker-label">{label}</label>
        <div className="picker-controls">
          <button
            type="button"
            className="picker-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ backgroundColor: value }}
          >
            <span className="picker-preview" />
          </button>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="native-color-input"
          />
        </div>
      </div>

      {isOpen && (
        <div className="picker-dropdown">
          {/* Color Formats */}
          {showFormats && (
            <div className="picker-section">
              <h4>Color Formats</h4>
              <div className="format-tabs">
                {colorFormats.map((format) => (
                  <button
                    key={format.name}
                    className={`format-tab ${activeFormat === format.name ? 'active' : ''}`}
                    onClick={() => setActiveFormat(format.name as any)}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formatValue}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="format-input"
                placeholder={`Enter ${activeFormat.toUpperCase()} value`}
              />
            </div>
          )}

          {/* Color Presets */}
          <div className="picker-section">
            <h4>Popular Presets</h4>
            <div className="color-presets">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  className="preset-button"
                  onClick={() => handlePresetClick(preset)}
                  title={preset.name}
                >
                  <div className="preset-colors">
                    {preset.colors.map((color, index) => (
                      <div
                        key={index}
                        className="preset-color"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="preset-name">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Harmonies */}
          {showHarmony && (
            <div className="picker-section">
              <h4>Color Harmonies</h4>
              <div className="color-harmonies">
                {generateHarmonies(value).map((harmony) => (
                  <div key={harmony.name} className="harmony-group">
                    <h5>{harmony.name}</h5>
                    <p className="harmony-description">{harmony.description}</p>
                    <div className="harmony-colors">
                      {harmony.colors.map((color, index) => (
                        <button
                          key={index}
                          className="harmony-color"
                          style={{ backgroundColor: color }}
                          onClick={() => handleHarmonyClick(color)}
                          title={`${harmony.name} color ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accessibility Information */}
          {showAccessibility && (
            <div className="picker-section">
              <h4>Accessibility</h4>
              <div className="accessibility-info">
                <div className="accessibility-row">
                  <span>Type:</span>
                  <span className={accessibilityInfo.isLight ? 'light-color' : 'dark-color'}>
                    {accessibilityInfo.isLight ? 'Light' : 'Dark'}
                  </span>
                </div>
                <div className="accessibility-row">
                  <span>Contrast with White:</span>
                  <span className={accessibilityInfo.meetsAAWhite ? 'pass' : 'fail'}>
                    {accessibilityInfo.contrastWithWhite.toFixed(2)}:1
                    {accessibilityInfo.meetsAAWhite ? ' ✓' : ' ✗'}
                  </span>
                </div>
                <div className="accessibility-row">
                  <span>Contrast with Black:</span>
                  <span className={accessibilityInfo.meetsAABlack ? 'pass' : 'fail'}>
                    {accessibilityInfo.contrastWithBlack.toFixed(2)}:1
                    {accessibilityInfo.meetsAABlack ? ' ✓' : ' ✗'}
                  </span>
                </div>
                <div className="accessibility-row">
                  <span>Suggested Text:</span>
                  <span
                    className="suggested-text"
                    style={{ color: accessibilityInfo.suggestedTextColor }}
                  >
                    Sample Text
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedColorPicker;