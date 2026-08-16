import { createContext, useContext, useState, useEffect } from 'react';
import { colorSettingsService } from '../services/supabaseService.js';

const ColorContext = createContext();

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState(colorSettingsService.getDefaultColors());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to load from localStorage for instant color application
    const savedColors = localStorage.getItem('siteColors');
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        setColors(parsedColors);
        applyColorsToCSS(parsedColors);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing saved colors:', error);
        loadColors();
      }
    } else {
      loadColors();
    }
  }, []);

  useEffect(() => {
    // Apply colors to CSS variables immediately when colors change
    if (!loading) {
      applyColorsToCSS(colors);
    }
  }, [colors, loading]);

  const applyColorsToCSS = (colorValues) => {
    if (!colorValues) return;

    console.log('Applying colors to CSS:', colorValues);
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorValues.primary_color);
    root.style.setProperty('--primary-dark', colorValues.primary_dark);
    root.style.setProperty('--primary-light', colorValues.primary_light);
    root.style.setProperty('--secondary-color', colorValues.secondary_color);
    root.style.setProperty('--background-primary', colorValues.background_primary);
    root.style.setProperty('--background-secondary', colorValues.background_secondary);
    root.style.setProperty('--text-primary', colorValues.text_primary);
    root.style.setProperty('--text-secondary', colorValues.text_secondary);
    root.style.setProperty('--text-muted', colorValues.text_muted);
    root.style.setProperty('--border-color', colorValues.border_color);
    root.style.setProperty('--success-color', colorValues.success_color);
    root.style.setProperty('--warning-color', colorValues.warning_color);
    root.style.setProperty('--error-color', colorValues.error_color);
    root.style.setProperty('--button-gradient-start', colorValues.button_gradient_start);
    root.style.setProperty('--button-gradient-end', color_values.button_gradient_end);
    root.style.setProperty('--logo-color', colorValues.logo_color || colorValues.primary_color);
    root.style.setProperty('--tag-color', colorValues.tag_color || colorValues.primary_color);

    // Verify CSS variables were set
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
    console.log('Primary color after setting:', primaryColor);
    console.log('CSS variables set successfully');
  };

  const loadColors = async () => {
    try {
      console.log('Loading colors from database...');
      const loadedColors = await colorSettingsService.getAll();
      console.log('Colors loaded:', loadedColors);
      setColors(loadedColors);

      // Apply colors immediately after loading
      applyColorsToCSS(loadedColors);

      // Save to localStorage for persistence
      localStorage.setItem('siteColors', JSON.stringify(loadedColors));
    } catch (error) {
      console.error('Error loading colors:', error);
      // Try to load from localStorage as fallback
      const savedColors = localStorage.getItem('siteColors');
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        setColors(parsedColors);
        applyColorsToCSS(parsedColors);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateColor = async (key, value) => {
    try {
      await colorSettingsService.update(key, value);
      const updatedColors = { ...colors, [key]: value };
      setColors(updatedColors);
      localStorage.setItem('siteColors', JSON.stringify(updatedColors));
    } catch (error) {
      console.error('Error updating color:', error);
      throw error;
    }
  };

  const updateColors = async (newColors) => {
    try {
      await colorSettingsService.updateMultiple(newColors);
      const updatedColors = { ...colors, ...newColors };
      setColors(updatedColors);
      localStorage.setItem('siteColors', JSON.stringify(updatedColors));
    } catch (error) {
      console.error('Error updating colors:', error);
      throw error;
    }
  };

  const resetColors = async () => {
    try {
      const defaultColors = colorSettingsService.getDefaultColors();
      await colorSettingsService.updateMultiple(defaultColors);
      setColors(defaultColors);
    } catch (error) {
      console.error('Error resetting colors:', error);
      throw error;
    }
  };

  const value = {
    colors,
    loading,
    updateColor,
    updateColors,
    resetColors,
    refreshColors: loadColors
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
