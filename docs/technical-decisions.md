# Technical decisions

## Expo and native runtime

Selected Expo SDK 58 stable using the npm registry and Expo's bundled compatibility
matrix on 2026-10-22. Native dependencies were installed with `expo install`.
React 19.3 / React Native 0.88 pair with this SDK; Reanimated 4.7.1 requires
Worklets 0.13.0. Use the Expo Babel preset's automatic configuration, not a duplicate
legacy Reanimated plugin. SVG is installed for lightweight native visuals.

Stage 1 uses Expo Router tabs and can be opened in an SDK-compatible Expo Go client.
Expo Go is a convenience, not the final native integration target. Before adding
BLE or native frame processing, install `expo-dev-client` with Expo and build a
custom client using `npx expo run:android` / `npx expo run:ios` (native toolchains
required). Use config plugins and Continuous Native Generation; generated native
folders are ignored. Rebuild the client after native dependency/config changes.
Review generated projects before any clean regeneration if native edits exist.
No cloud backend or EAS account is required for local builds.

Node 26.0.0 was available on this workstation; use a compatible Node 24 LTS release
for team development. Validate upgrades with Expo Doctor, install checks, tests and
native builds. Do not assume a successful JS export proves native module operation.

Sources: [Expo Router installation](https://docs.expo.dev/router/installation/),
[development builds](https://docs.expo.dev/develop/development-builds/introduction/),
[Reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/).

## Camera and computer vision

Keep the `TrackingProvider` boundary independent of implementation. Expo Camera may
cover preview and recording, but high-throughput frame access, marker detection and
OpenCV may need a native camera pipeline / JSI module and a development build.
Assess a current native frame-processing library on both target platforms before
selection. Python OpenCV does not run directly inside React Native. A native C++
OpenCV binding or another supported on-device implementation is an option, not an
installed dependency. Avoid moving every full camera frame through JS. Camera
permissions, thermal load, focus/exposure and lifecycle require device testing.

Calibration, marker size, camera placement and coordinate convention must be agreed
before reporting meters. Detection confidence is not physical accuracy. Do not
mix image displacement with world distance. Hardware telemetry and camera clocks
need synchronization metadata for evidence correlation.

## Stage 2 3D recommendation (not installed)

Prototype Three.js with `@react-three/fiber/native`, Expo GL and Expo Asset. Fiber 9
pairs with React 19 according to its documentation; verify the exact release peer
ranges against React 19.3 and SDK 58 before installation. Expo GL should be installed
through Expo. Use a small GLB model or simple geometry, meter scale, documented axes
and separate wheel/body pivots. Feed `RobotVisualizationState` props into the renderer;
retain a lightweight SVG fallback if GL fails or the device is constrained.

Test context creation, touch gestures, app background/foreground, context loss,
asset loading, memory and frame rate on real Android and iOS devices before adopting
this stack. Browser/WebGL success is not proof of mobile GL compatibility. Add GLB
Metro asset configuration only when a model is introduced. Avoid DOM-only Drei
helpers and desktop shader assumptions. No GL/Three/Fiber packages are installed
in Stage 1, and performance feasibility has not been verified.

Source: [React Three Fiber installation and native support](https://r3f.docs.pmnd.rs/getting-started/installation).

## Storage, testing and integrity

Zustand owns only session state now; no persistence middleware. A future local SQLite
repository plus evidence files is a reasonable Stage 7 candidate. Define migrations,
atomic result/evidence commits, retention, disk-full recovery and export validation
then. Readonly contracts are compile-time protection only.

Jest uses `jest-expo`; React Native Testing Library checks semantic rendering.
Provider tests use explicit synthetic fixtures, never displayed as live readings.
Navigation tests and exports supplement these checks; only device execution can
verify native UI and permissions. ESLint uses Expo's flat config and Prettier handles
formatting separately. Lockfile installation (`npm ci`) is the reproducible workflow.
