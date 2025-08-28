# E‑Week 2K25 Mobile App 📱

Expo & React Native app for E‑Week 2025 Odyssey – events, schedules, registrations, leaderboard, history, and notifications.

## ✨ Features
- 🏠 Dashboard and quick actions
- 🗓️ Events list and details
- 📝 Registrations (modal)
- 🏆 Leaderboard
- 🕰️ History
- 👤 Profile & preferences
- 🔔 Notifications (Expo)

## 🧰 Tech Stack
- Expo 53, React Native 0.79, React 19
- React Navigation (tabs, stacks)
- axios, expo‑notifications, expo‑linear‑gradient, lucide‑react‑native

## 🚀 Quick Start
1) Install deps: `npm install`
2) Start development server: `npm run start`
3) Open on device with Expo Go or run platform targets:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

Backend expected: E‑Week server (default http://localhost:5001). For real devices, use LAN IP.

## 🧭 Navigation
- `src/navigation/MainNavigator.js` – main tabs
- `src/navigation/AuthNavigator.js` – auth flow (if enabled)
- `src/navigation/ProfileStackNavigator.js` – profile stack

## 📱 Screens
Dashboard, Events, Event Details, Leaderboard, History, Notifications, Profile, About, Help & Support, Splash.

## 🔐 Configuration (optional)
- `API_BASE_URL` via app config or constants to point at your server

## 🧪 Scripts
- `npm run start` – Expo dev server
- `npm run android` / `npm run ios` / `npm run web`

---
Built with ⚡️ by the E‑Week 2025 team.
