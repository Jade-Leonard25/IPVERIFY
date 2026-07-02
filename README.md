# IP Verify - Single Page Application

A client-side IP address verification tool built with React, Vite, and HeroUI. This SPA fetches and displays detailed network information including IP, geolocation, ASN, and proxy status.

## 🚀 Application Overview

This Single Page Application (SPA) provides a clean, modern interface for users to check their public IP address and associated network metadata. The application follows a clear state-driven UI pattern:

- **Idle State**: Initial landing view with a call-to-action button
- **Loading State**: Shows a spinner with status message during API fetch
- **Success State**: Displays comprehensive IP data in a structured grid
- **Error State**: Shows error message with retry option

## 📱 UI Components & Layout

The application uses a **3-column grid layout** (desktop) that adapts to a single column on mobile:

| Column | Content |
|--------|---------|
| **Left Sidebar (Desktop)** | 160x600 vertical ad placement (Skyscraper) |
| **Center (Main)** | Core application: IP lookup, results display, metadata grid |
| **Right Sidebar (Desktop)** | 160x600 vertical ad placement (Skyscraper) |
| **Footer (All Devices)** | Optional 728x90 horizontal banner ad placement |

### Key UI Features:
- **Sticky navigation** with NetVerify branding
- **Glass-morphism design** with dark theme (slate-900 background)
- **Responsive results grid** (1 column mobile → 3 columns desktop)
- **Copy to clipboard** functionality for IP address
- **HeroUI v3** components (Card, Button, Spinner, Typography)

## 🔧 Environment Configuration

This application uses an environment variable for the API endpoint:

```env
# .env file (create this in your project root)
VITE_REACT_API_MAIN=https://api.ipify.org?format=json