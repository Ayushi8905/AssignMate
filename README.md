# Assignmate - Student Assignment Tracker App

A React Native student assignment tracker app built with Expo.

## Setup

1. Install dependencies:
```bash
bun install
```

## Running the App

### Development Server
```bash
bun start
```

### Web Development
```bash
bun run start-web
```

### Platform-Specific

- **iOS**: Press `i` in the terminal after starting the dev server
- **Android**: Press `a` in the terminal after starting the dev server
- **Web**: Press `w` in the terminal after starting the dev server

## Project Structure

- `/app` - Main application screens using Expo Router
  - `index.tsx` - Splash screen
  - `welcome.tsx` - Welcome/onboarding screen
  - `videos.tsx` - Video showcase screen
  - `planning.tsx` - Planning options screen
  - `plans.tsx` - Subscription plans screen
  - `demo-form.tsx` - Demo request form
  - `_layout.tsx` - Root layout with navigation
- `/constants` - App constants and theme colors
- `/assets` - Static assets (images, fonts, etc.)

## Features

- Animated splash screen
- Onboarding flow
- Video showcase
- Multiple subscription plans
- Demo request form
- Gradient UI with modern design
- Safe area handling for all devices

## Tech Stack

- React Native 0.81.5
- Expo SDK 54
- Expo Router for navigation
- React Query for data fetching
- Lucide React Native for icons
- TypeScript
