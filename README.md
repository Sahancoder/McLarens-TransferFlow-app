# McLarens TransferFlow App

This is the React Native (Expo) implementation of the McLarens TransferFlow application.

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Setup

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Start the app:
    ```bash
    npm start
    ```

## Project Structure

- `src/app`: Main app entry, navigation, and providers.
- `src/features`: Feature-based modules (Auth, Transfers, Analytics).
- `src/shared`: Shared components, constants, and utilities.
- `App.tsx`: Root entry point.
- `tailwind.config.js`: Tailwind CSS configuration.
- `babel.config.js`: Babel configuration for NativeWind.

## Features Implemented (MVP Skeleton)

- **Authentication**: Login screen with role selection (Dispatcher/Driver).
- **Dispatcher**:
  - Dashboard with Active/Completed jobs.
  - Create Transfer Request screen.
  - Analytics screen.
- **Driver**:
  - Job card with status actions (Accept, Pickup, Dropoff).
- **Navigation**: Tab navigation for Dispatcher, Stack navigation for flows.
- **Styling**: Tailwind CSS with NativeWind.

## Notes

- This is a frontend skeleton with mock data (`src/shared/constants/data.ts`).
- Appwrite integration is not yet implemented.
- Location tracking is UI-only (placeholder map).
