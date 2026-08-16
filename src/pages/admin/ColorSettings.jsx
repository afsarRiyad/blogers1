import { useState, useEffect } from 'react';
import { useColors } from '../../context/ColorContext.jsx';
import { Save, RotateCcw, Palette } from 'lucide-react';

const colorGroups = [
  {
    name: 'Primary Colors',
    colors: [
      { key: 'primary_color', label: 'Primary Color', description: 'Main color for buttons, links, and accents' },
      { key: 'primary_dark', label: 'Primary Dark', description: 'Darker shade for hover states' },
      { key: 'primary_light', label: 'Primary Light', description: 'Lighter shade for backgrounds' },
      { key: 'logo_color', label: 'Logo Color', description: 'Logo and branding color' },
      { key: 'tag_color', label: 'Tag Color', description: 'Category and tag colors' },
    ]
  },
  {
    name: 'Secondary Colors',
    colors: [
      { key: 'secondary_color', label: 'Secondary Color', description: 'Secondary accent color' },
      { key: 'success_color', label: 'Success Color', description: 'Success state color' },
      { key: 'warning_color', label: 'Warning Color', description: 'Warning state color' },
      { key: 'error_color', label: 'Error Color', description: 'Error state color' },
    ]
  },
  {
    name: 'Background Colors',
    colors: [
      { key: 'background_primary', label: 'Primary Background', description: 'Main background color' },
      { key: 'background_secondary', label: 'Secondary Background', description: 'Cards and containers background' },
    ]
  },
  {
    name: 'Text Colors',
    colors: [
      { key: 'text_primary', label: 'Primary Text', description: 'Headings and important text' },
      { key: 'text_secondary', label: 'Secondary Text', description: 'Body text and descriptions' },
      { key: 'text_muted', label: 'Muted Text', description: 'Meta information and labels' },
    ]
  },
  {
    name: 'UI Elements',
    colors: [
      { key: 'border_color', label: 'Border Color', description: 'Borders and dividers' },
      { key: 'button_gradient_start', label: 'Button Gradient Start', description: 'Button gradient start color' },
      { key: 'button_gradient_end', label: 'Button Gradient End', description: 'Button gradient end color' },
    ]
  }
];

export default function ColorSettings() {
  const { colors, loading, updateColors, resetColors } = useColors();
  const [localColors, setLocalColors] = useState({});
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!loading) {
      console.log('Setting local colors from loaded colors:', colors);
      setLocalColors({ ...colors });
    }
  }, [colors, loading]);

  const handleColorChange = (key, value) => {
    setLocalColors(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log('Saving colors:', localColors);
      await updateColors(localColors);
      setHasChanges(false);
      alert('Color settings saved successfully!');
      console.log('Colors saved and applied:', localColors);
    } catch (error) {
      console.error('Error saving colors:', error);
      alert('Failed to save color settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all colors to default?')) {
      return;
    }

    try {
      setSaving(true);
      await resetColors();
      setHasChanges(false);
      alert('Colors reset to default!');
    } catch (error) {
      console.error('Error resetting colors:', error);
      alert('Failed to reset colors. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-dark-600">Loading color settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl logo-gradient flex items-center justify-center text-white shadow-glow">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900">
              Color Settings
            </h1>
            <p className="text-sm text-dark-600">
              Customize the colors of your blog interface
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <p className="text-sm text-dark-600">
          {hasChanges ? 'You have unsaved changes' : 'All changes are saved'}
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r-from-primary text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Color Groups */}
      <div className="space-y-6">
        {colorGroups.map((group) => (
          <div key={group.name} className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
            <h2 className="text-lg font-bold text-dark-900 mb-4">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <div key={color.key} className="space-y-2">
                  <label className="block text-sm font-bold text-dark-900">
                    {color.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localColors[color.key] || colors[color.key]}
                      onChange={(e) => handleColorChange(color.key, e.target.value)}
                      className="w-12 h-12 rounded-lg border border-dark-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localColors[color.key] || colors[color.key]}
                      onChange={(e) => handleColorChange(color.key, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="#000000"
                    />
                  </div>
                  <p className="text-xs text-dark-500">{color.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
        <h2 className="text-lg font-bold text-dark-900 mb-4">Preview</h2>
        <div className="space-y-4">
          {/* Button Preview */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r-from-primary text-white font-bold shadow-lg">
              Primary Button
            </button>
            <button className="px-6 py-3 rounded-xl border border-dark-200 text-dark-700 font-medium hover:bg-dark-50">
              Secondary Button
            </button>
          </div>

          {/* Text Preview */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold" style={{ color: localColors.text_primary || colors.text_primary }}>Heading Text</h3>
            <p style={{ color: localColors.text_secondary || colors.text_secondary }}>Body text with normal styling. This is how regular content will appear.</p>
            <p className="text-sm" style={{ color: localColors.text_muted || colors.text_muted }}>Muted text for labels and metadata.</p>
          </div>

          {/* Background Preview */}
          <div className="space-y-3">
            <div style={{ backgroundColor: localColors.background_primary || colors.background_primary, color: localColors.text_primary || colors.text_primary }} className="p-4 rounded-lg">
              <p className="font-bold">Primary Background</p>
              <p className="text-sm opacity-80">This is the main background color</p>
            </div>
            <div style={{ backgroundColor: localColors.background_secondary || colors.background_secondary, color: localColors.text_secondary || colors.text_secondary, borderColor: localColors.border_color || colors.border_color }} className="p-4 rounded-lg border">
              <p className="font-bold">Secondary Background</p>
              <p className="text-sm opacity-80">This is the card/container background color</p>
            </div>
          </div>

          {/* Status Colors */}
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">Success</span>
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">Warning</span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">Error</span>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-dark-200">
            <div className="text-center">
              <div className="w-full h-12 rounded-lg mb-2" style={{ backgroundColor: localColors.primary_color || colors.primary_color }}></div>
              <p className="text-xs text-dark-600">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-12 rounded-lg mb-2" style={{ backgroundColor: localColors.secondary_color || colors.secondary_color }}></div>
              <p className="text-xs text-dark-600">Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-12 rounded-lg mb-2" style={{ backgroundColor: localColors.success_color || colors.success_color }}></div>
              <p className="text-xs text-dark-600">Success</p>
            </div>
            <div className="text-center">
              <div className="w-full h-12 rounded-lg mb-2" style={{ backgroundColor: localColors.error_color || colors.error_color }}></div>
              <p className="text-xs text-dark-600">Error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
