import { useState, useEffect } from 'react';
import { Plus, Trash2, ExternalLink, Copy, Save, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase.js';

const TABLES = {
  PUSH_FORM_SETTINGS: 'push_form_settings'
};

export default function PushFormSettings() {
  const [settings, setSettings] = useState({
    heading: '',
    subheading: '',
    buttons: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.PUSH_FORM_SETTINGS)
        .select('*')
        .limit(1);

      if (error) {
        console.error('Error loading push form settings:', error);
        setSettings({
          heading: '',
          subheading: '',
          buttons: []
        });
      } else if (data && data.length > 0) {
        setSettings({
          heading: data[0].heading || '',
          subheading: data[0].subheading || '',
          buttons: data[0].buttons || []
        });
      } else {
        // No settings found, use defaults
        setSettings({
          heading: '',
          subheading: '',
          buttons: []
        });
      }
    } catch (error) {
      console.error('Error loading push form settings:', error);
      setSettings({
        heading: '',
        subheading: '',
        buttons: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // First try to get existing settings
      const { data: existingData } = await supabase
        .from(TABLES.PUSH_FORM_SETTINGS)
        .select('id')
        .limit(1);

      let error;
      if (existingData && existingData.length > 0) {
        // Update existing
        const result = await supabase
          .from(TABLES.PUSH_FORM_SETTINGS)
          .update({
            heading: settings.heading,
            subheading: settings.subheading,
            buttons: settings.buttons,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData[0].id);
        error = result.error;
      } else {
        // Insert new
        const result = await supabase
          .from(TABLES.PUSH_FORM_SETTINGS)
          .insert({
            heading: settings.heading,
            subheading: settings.subheading,
            buttons: settings.buttons
          });
        error = result.error;
      }

      if (error) throw error;

      setHasChanges(false);
      alert('Push form settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all settings to default?')) {
      return;
    }

    try {
      setSaving(true);
      setSettings({
        heading: '',
        subheading: '',
        buttons: []
      });
      setHasChanges(false);
      alert('Settings reset to default!');
    } catch (error) {
      console.error('Error resetting settings:', error);
      alert('Failed to reset settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addButton = (type) => {
    const newButton = {
      id: Date.now(),
      type: type,
      text: '',
      label: type === 'copy' ? 'Copy' : '',
      url: type === 'link' ? '' : undefined,
      backgroundColor: '',
      textColor: ''
    };
    setSettings(prev => ({
      ...prev,
      buttons: [...prev.buttons, newButton]
    }));
    setHasChanges(true);
  };

  const updateButton = (index, field, value) => {
    setSettings(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) =>
        i === index ? { ...btn, [field]: value } : btn
      )
    }));
    setHasChanges(true);
  };

  const removeButton = (index) => {
    setSettings(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-dark-600">Loading push form settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 mb-2">
          Push Form Dashboard Settings
        </h1>
        <p className="text-sm text-dark-600">
          Customize the push form dashboard that appears on your posts
        </p>
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

      {/* Settings Form */}
      <div className="space-y-6">
        {/* Heading Section */}
        <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
          <h2 className="text-lg font-bold text-dark-900 mb-4">Heading & Subheading</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={settings.heading}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, heading: e.target.value }));
                  setHasChanges(true);
                }}
                className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                placeholder="e.g., Shazam Premium APK"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Subheading (Optional)
              </label>
              <textarea
                value={settings.subheading}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, subheading: e.target.value }));
                  setHasChanges(true);
                }}
                className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                rows={2}
                placeholder="e.g., Download the latest version of Shazam Premium APK"
              />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark-900">Buttons</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addButton('link')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dark-200 text-dark-700 text-sm font-medium hover:bg-dark-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Add Link Button
              </button>
              <button
                onClick={() => addButton('copy')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dark-200 text-dark-700 text-sm font-medium hover:bg-dark-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Add Copy Button
              </button>
            </div>
          </div>

          {settings.buttons.length === 0 ? (
            <div className="text-center py-8 text-dark-500">
              <p className="text-sm">No buttons added yet. Click the buttons above to add buttons.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {settings.buttons.map((button, index) => (
                <div key={button.id} className="p-4 rounded-xl border border-dark-200 bg-dark-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {button.type === 'link' ? (
                        <ExternalLink className="w-4 h-4 text-primary-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-primary-600" />
                      )}
                      <span className="text-sm font-bold text-dark-900">
                        {button.type === 'link' ? 'Link Button' : 'Copy Button'} #{index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeButton(index)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-dark-900 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={button.text}
                        onChange={(e) => updateButton(index, 'text', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                        placeholder="e.g., Download Now"
                      />
                    </div>

                    {button.type === 'link' && (
                      <div>
                        <label className="block text-sm font-bold text-dark-900 mb-2">
                          URL
                        </label>
                        <input
                          type="url"
                          value={button.url || ''}
                          onChange={(e) => updateButton(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="https://example.com"
                        />
                      </div>
                    )}

                    {button.type === 'copy' && (
                      <div>
                        <label className="block text-sm font-bold text-dark-900 mb-2">
                          Copy Label
                        </label>
                        <input
                          type="text"
                          value={button.label || ''}
                          onChange={(e) => updateButton(index, 'label', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="e.g., Copy"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-dark-900 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={button.backgroundColor || '#0ea5e9'}
                          onChange={(e) => updateButton(index, 'backgroundColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-dark-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={button.backgroundColor || ''}
                          onChange={(e) => updateButton(index, 'backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-dark-900 mb-2">
                        Text Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={button.textColor || '#ffffff'}
                          onChange={(e) => updateButton(index, 'textColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-dark-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={button.textColor || ''}
                          onChange={(e) => updateButton(index, 'textColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-dark-900 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={button.backgroundColor || '#0ea5e9'}
                          onChange={(e) => updateButton(index, 'backgroundColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-dark-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={button.backgroundColor || ''}
                          onChange={(e) => updateButton(index, 'backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-dark-900 mb-2">
                        Text Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={button.textColor || '#ffffff'}
                          onChange={(e) => updateButton(index, 'textColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-dark-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={button.textColor || ''}
                          onChange={(e) => updateButton(index, 'textColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}