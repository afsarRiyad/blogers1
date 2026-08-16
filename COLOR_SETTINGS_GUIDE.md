# Color Settings Setup Guide

## 🎨 Color Control System

Your blog now has a complete color customization system that can be controlled from the admin panel.

## 📋 Setup Instructions

### 1. Run the SQL Script

Execute the SQL script in your Supabase SQL Editor:

```bash
# Run this in Supabase SQL Editor
supabase/color_settings.sql
```

This will create the `color_settings` table and insert default colors.

### 2. Access Color Settings

1. Log in to your admin panel at `/admin/login`
2. Navigate to **Color Settings** in the sidebar
3. Customize colors using the color picker or hex codes
4. Click **Save Changes** to apply

## 🎯 Available Color Controls

### Primary Colors
- **Primary Color**: Main color for buttons, links, and accents
- **Primary Dark**: Darker shade for hover states
- **Primary Light**: Lighter shade for backgrounds

### Secondary Colors
- **Secondary Color**: Secondary accent color
- **Success Color**: Success state color
- **Warning Color**: Warning state color
- **Error Color**: Error state color

### Background Colors
- **Primary Background**: Main background color
- **Secondary Background**: Cards and containers background

### Text Colors
- **Primary Text**: Headings and important text
- **Secondary Text**: Body text and descriptions
- **Muted Text**: Meta information and labels

### UI Elements
- **Border Color**: Borders and dividers
- **Button Gradient Start**: Button gradient start color
- **Button Gradient End**: Button gradient end color

## 🔧 How It Works

1. **CSS Variables**: Colors are stored as CSS variables (`--primary-color`, etc.)
2. **Dynamic Updates**: When you save colors, CSS variables are updated immediately
3. **Tailwind Integration**: Tailwind uses CSS variables for primary colors
4. **Live Preview**: See your changes in real-time in the preview section

## 🎨 Default Colors

- Primary: `#0ea5e9` (Sky Blue)
- Secondary: `#6366f1` (Indigo)
- Success: `#22c55e` (Green)
- Warning: `#f59e0b` (Yellow)
- Error: `#ef4444` (Red)

## 🚀 Features

- **Real-time Preview**: See changes immediately
- **Reset to Default**: One-click reset to original colors
- **Save Changes**: Persist colors to database
- **Color Picker**: Easy color selection
- **Hex Input**: Manual hex code entry

## 📝 Notes

- Colors are stored in Supabase and cached for performance
- Changes apply globally across the entire site
- Requires Supabase RLS policies to be set correctly
- Admin authentication required to access color settings
