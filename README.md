# Missing Paw 🐾

A mobile app built with Expo + React Native + TypeScript that helps pet owners report missing pets and lets the community report sightings. Data and authentication are handled using Firebase (Realtime Database, Auth, Storage). Push notifications use Expo Notifications.

---

## Table of contents

- [Missing Paw 🐾](#missing-paw-)
  - [Table of contents](#table-of-contents)
  - [Features ✅](#features-)
  - [Tech stack 🔧](#tech-stack-)
  - [Project structure 📁](#project-structure-)
  - [Firebase data model (overview) 🗂️](#firebase-data-model-overview-️)
  - [Setup \& run (development) 🚀](#setup--run-development-)
  - [Configuration 🔧](#configuration-)
  - [Notes \& caveats ⚠️](#notes--caveats-️)
  - [Contributing 🤝](#contributing-)
  - [License 📜](#license-)

---

## Features ✅

- Email/password authentication (Firebase Auth)
- User profile with one or more pets (image upload via Firebase Storage)
- Mark your pet as missing / found
- Browse other users' missing pets and report sightings
- Store sightings under the affected pet (with reporter, date, location)
- View sightings and mark them as seen
- Basic theming (light / dark) and i18n scaffolding
- Expo push notification support (uses `expo-notifications`)

---

## Tech stack 🔧

- Expo (managed workflow)
- React Native + TypeScript
- Firebase: Realtime Database, Auth, Storage
- Expo Notifications
- React Navigation (bottom tabs + stack)

Key dependencies are listed in `package.json` (e.g. `expo`, `firebase`, `react-native-reanimated`, `expo-image-picker`).

---

## Project structure 📁

Top-level:

- `App.tsx` — app entry and top-level navigation & auth listener
- `FirebaseConfig.ts` — Firebase initialization (replace with your credentials)
- `app/` — source code
  - `screens/` — main app screens (authentication, home, missing pets, sightings, settings)
  - `helper/` — themed components, icons, push notification hook
  - `i18n/` — localization scaffolding (locale JSON files are currently empty)

---

## Firebase data model (overview) 🗂️

A simplified view of the Realtime Database layout used by the app:

```
users
  {uid}
    id
    firstName
    lastName
    email
    pet:
      0:
        id
        name
        age
        type
        breed
        color
        imageUrl
        missing (boolean)
        missingSince (timestamp)
        missingLocation (string)
        sightings:
          {sightingId}:
            id, description, location, date, reporter, seen (boolean)
```

---

## Setup & run (development) 🚀

Prerequisites:

- Node.js (LTS)
- npm or Yarn
- Expo CLI (optional but useful): `npm i -g expo-cli`
- A Firebase project with Auth (Email/Password), Realtime Database, and Storage enabled

Install and run:

```bash
# from repo root
npm install
# or
# yarn

# start the dev server
npm run start
# or
# expo start
```

Use the Expo Go app or an emulator. Note: Expo push notifications require a physical device.

---

## Configuration 🔧

- `FirebaseConfig.ts` contains the Firebase configuration and initialization. Replace the values with your project's credentials or refactor to use environment variables (recommended) instead of committing keys.

- Realtime Database rules: ensure authenticated users have appropriate read/write permissions for the paths used (e.g. `/users/{uid}`), or adapt the security rules to your requirements.

- Expo push notifications: the code uses `expo-notifications` and calls `getExpoPushTokenAsync()` — set up your Expo account and follow Expo docs if you plan to test push notifications.

---

## Notes & caveats ⚠️

- Localization files (`app/i18n/locales/en.json` and `de.json`) are empty — add translations to enable i18n.
- Image uploads currently use a storage reference based on the user id: this may overwrite previous images if multiple images are uploaded under the same ref — consider using a unique filename (timestamp / UUID) for each upload.
- Some UI strings are currently in English and hard-coded; migrating more strings to i18n keys will make localization easier.
- No automated tests or CI configured (you can add GitHub Actions / EAS workflows as needed).

---

## Contributing 🤝

- Create an issue describing the change or bug
- Open a PR with a clear description and small, focused changes

If you'd like, I can help scaffold tests, CI, or add localization and environment-config improvements.

---

## License 📜

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2026 Umut
