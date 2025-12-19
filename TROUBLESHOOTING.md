# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Cannot find module" errors

**Problem**: Missing dependencies or corrupted node_modules

**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules
bun install
```

### 2. Metro bundler cache issues

**Problem**: App not reflecting changes or showing stale content

**Solution**:
```bash
# Clear Metro cache
bun start --clear
```

### 3. TypeScript errors after pulling changes

**Problem**: Type definitions out of sync

**Solution**:
```bash
# Reinstall dependencies
bun install

# If issues persist, restart your IDE/editor
```

### 4. Expo CLI not found

**Problem**: Expo commands not working

**Solution**:
```bash
# Install Expo CLI globally
npm install -g expo-cli
# or
bun add -g expo-cli
```

### 5. Port already in use

**Problem**: Development server can't start because port is occupied

**Solution**:
```bash
# Kill the process using the port (Windows)
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Or start on a different port
bun start --port 8082
```

### 6. iOS Simulator not opening

**Problem**: Xcode or iOS Simulator not configured

**Solution**:
- Ensure Xcode is installed (Mac only)
- Open Xcode and accept license agreements
- Install iOS Simulator from Xcode preferences

### 7. Android Emulator not starting

**Problem**: Android Studio or emulator not configured

**Solution**:
- Install Android Studio
- Set up Android SDK and emulator
- Add Android SDK to PATH
- Start emulator manually from Android Studio

### 8. Web version not loading

**Problem**: Web dependencies missing or misconfigured

**Solution**:
```bash
# Ensure web dependencies are installed
bun add react-native-web react-dom
bun start --web
```

### 9. Build errors with native modules

**Problem**: Native modules not linking properly

**Solution**:
```bash
# For iOS (Mac only)
cd ios && pod install && cd ..

# For Android
cd android && ./gradlew clean && cd ..
```

### 10. Type errors with third-party libraries

**Problem**: Missing or incompatible type definitions

**Solution**:
- Check if `skipLibCheck: true` is in tsconfig.json
- Use `@ts-expect-error` or `@ts-ignore` for known issues
- Update packages to compatible versions

## Getting Help

If you encounter issues not covered here:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Search [Expo forums](https://forums.expo.dev/)
3. Check [React Native documentation](https://reactnative.dev/)
4. Review GitHub issues for specific packages

## Useful Commands

```bash
# Check Expo doctor for issues
npx expo-doctor

# Update Expo SDK
npx expo upgrade

# Check package versions
bun list

# Verify TypeScript config
npx tsc --showConfig
```
