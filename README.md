# NEXUS

"N.E.X.U.S. – Nanobot-Enabled eXperiential Universal System: AI-integrated ethical health augmentation framework"

## N.E.X.U.S. (Nanobot-Enabled eXperience and Understanding System)

![N.E.X.U.S. Logo](./A_logo_design_for_N.E.X.U.S._(Nanobot-Enabled_eXpe.png)

## Overview

N.E.X.U.S. is an interactive platform for simulating nanobot swarms, neural overlays, and human-machine interfaces.

## Features

- **Onboarding Guide:** Friendly overlay to help new users get started.
- **Settings Panel:** Change color scheme, font size, and enable high contrast mode. Preferences are saved automatically.
- **User Authentication:** Simple login form to restrict dashboard access.
- **Error Boundary:** Catches and displays UI errors gracefully.
- **404 Page:** User-friendly not found page for missing routes.
- **VoicePilot:** Type or speak commands to control the swarm and dashboard.
- **SwarmMap3D:** Visualizes the selected neural zone in a 3D map.
- **NeuroSync:** Streams simulated neural and biometric data; integrates with event log and chart.
- **NeuroChart:** Live chart visualizing neural signal, heart rate, and oxygen data. Supports CSV export.
- **Event Log:** Displays recent actions and data events.
- **Imaging:** View and overlay medical or neural imaging data (e.g., MRI, CT, EEG) within the dashboard.
- **Responsive Design:** Works on desktop and mobile screens.
- **Unit Tests:** Core components are covered by automated tests.

## Quick Start

1. **Install dependencies:**

 ```sh
 npm install
 # or
 yarn install
 ```

1. **Add a 3D body mesh:**

- Download a CC0-licensed human mesh (see `/docs/models/README.md`)
- Place as `body.glb` in `/docs/models/`

1. **Run the app:**

 ```sh
 npm start
 # or
 yarn start
 ```

1. **Login to NanoCodeLab:**

- Use the login form (default: admin/admin)

## Screenshots

| Component         | Screenshot Example |
|-------------------|-------------------|
| **Onboarding Guide** | ![Onboarding Guide](./screenshots/onboarding_guide.png) |
| **Settings Panel**   | ![Settings Panel](./screenshots/settings_panel.png) |
| **User Authentication** | ![Login Form](./screenshots/login_form.png) |
| **Error Boundary**     | ![Error Boundary](./screenshots/error_boundary.png) |
| **404 Page**           | ![404 Page](./screenshots/404_page.png) |
| **VoicePilot**         | ![VoicePilot](./screenshots/voice_pilot.png) |
| **SwarmMap3D**         | ![SwarmMap3D](./screenshots/swarm_map_3d.png) |
| **NeuroSync**          | ![NeuroSync](./screenshots/neuro_sync.png) |
| **NeuroChart**         | ![NeuroChart](./screenshots/neuro_chart.png) |
| **Event Log**          | ![Event Log](./screenshots/event_log.png) |
| **Imaging**            | ![Imaging Panel](./screenshots/imaging_panel.png) |

> Place your screenshots in the `screenshots` folder and update the file names as needed.

## File Structure

```plaintext
/docs/models/         # 3D models (body.glb)
/neuro_swarm_mapping.json  # Brain-to-swarm mapping config
NanoCodeLab.tsx      # Live programming console
SwarmMap3D.tsx       # 3D visualization
Dashboard.tsx        # Main dashboard UI
NeuroSync.tsx        # Neural/biometric data streaming
NeuroChart.tsx       # Data visualization chart
SettingsPanel.tsx    # User settings
OnboardingGuide.tsx  # Onboarding overlay
VoicePilot.tsx       # Command input
ErrorBoundary.tsx    # Error handling
NotFound.tsx         # 404 page
ImagingPanel.tsx     # Medical/neural imaging viewer and overlay
```

## Contributing

Pull requests welcome! Please open issues for suggestions or bugs.

## License

[MIT](./LICENSE)
