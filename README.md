# Geanos CineBars

System agnostic module that ransforms your FoundryVTT combat encounters into cinematic experiences with dynamic film bars that automatically appear during combat, just like in movies and TV shows.

## 🎬 What It Does

Geanos CineBars automatically adds sleek cinematic black bars (letterbox effect) to the top and bottom of your screen whenever combat begins. The bars smoothly animate in when combat starts and fade out when combat ends, creating an immersive, movie-like atmosphere for your most dramatic encounters.

## ✨ Features

- **Automatic Combat Detection**: Bars appear instantly when combat starts
- **Smart Combat Tracking**: Multiple hooks ensure reliable detection across different combat scenarios
- **Smooth Animations**: Professional fade-in/fade-out transitions
- **Zero Configuration**: Works immediately after installation
- **Session Persistence**: Maintains state across page refreshes during active combat
- **Manual Control**: Toggle bars on/off for special cinematic moments
- **Macro Support**: Accessible via global window object for advanced users
- **Lightweight**: Minimal performance impact with clean CSS animations

## 🎯 Perfect For

- **Dramatic Boss Battles**: Set the mood for epic encounters
- **Story Climaxes**: Enhance narrative tension during key moments  
- **Cinematic Campaigns**: Add film-like production value
- **Stream-Friendly**: Creates professional-looking broadcasts
- **Immersive Gaming**: Helps players focus on the action

## 🚀 Installation

1. Download the latest release
2. Extract to your `Data/modules/` directory
3. Restart FoundryVTT
4. Enable the module in your world's module settings

## 🎮 Usage

### Automatic Mode (Default)
The module works automatically once enabled:
- **Combat Starts**: Black bars smoothly slide in from top and bottom
- **Combat Ends**: Bars fade out, returning to normal view
- **Page Refresh**: Bars maintain proper state if combat is active

### Manual Control
For special cinematic moments, you can manually control the bars:

```javascript
// Toggle bars on/off
GeanoCineBars.toggleBars();

// Force bars to appear
GeanoCineBars.showBars();

// Force bars to hide
GeanoCineBars.hideBars();

// Check current combat status
GeanoCineBars.checkCombatStatus();
```

## 🎨 Visual Effect

The cinematic bars create the classic "letterbox" or "widescreen" effect:
- Sleek black bars at top and bottom of screen
- Smooth CSS transitions for professional appearance
- Non-intrusive - doesn't block UI elements
- Responsive design works on all screen sizes

## 🔧 Technical Details

The module uses multiple FoundryVTT hooks for maximum compatibility:
- `combatStart` - Primary combat detection
- `createCombat` - Alternative combat creation detection
- `updateCombat` - Monitors combat state changes
- `combatEnd` / `deleteCombat` - Combat termination detection
- `renderCombatTracker` - Additional state validation

This multi-hook approach ensures the bars work reliably across different systems and combat scenarios.

## 🔧 Compatibility

- **FoundryVTT Version**: v9+ (tested on v12)
- **System Compatibility**: Universal (works with any game system)

---

*Made with ❤️ for the FoundryVTT community*
