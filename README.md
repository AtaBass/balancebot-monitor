# BalanceBot Monitor

Stage 1 foundation for **Two-Wheeled Indoor Patient Assistance Robot**, a
multidisciplinary engineering project at Yıldız Technical University.

The Computer Engineering scope is mobile monitoring, smartphone-camera vision,
measurement, automated evaluation and reporting. The robot transports medication,
receives glove commands and docks for charging. This application is an independent
evaluation interface; it does not replace the glove or control robot movement.

No hardware or specification PDF was available during setup. Mandatory requirements
currently come from the supplied brief: tilt and charging telemetry at 1 Hz,
interruptions longer than 2 seconds, camera-based observations, four task categories,
and evidence-backed results with no manual failure-to-success override. Formal
thresholds must be checked against the specification before Stage 6.

## Install and run

Use Node 24 LTS (compatible with SDK 58) and npm. From this directory:

```sh
npm ci
npm start
# Open the QR code in an SDK-compatible Expo Go client, or:
npm run android
npm run ios
npm run web
```

Android/iOS scripts open Expo on an already configured emulator/simulator; they do
not compile a custom native client. For future native integrations, follow the
[development-build decision](docs/technical-decisions.md). No secrets, environment
variables or backend setup are needed. First-time dependency installation requires
internet; the final evaluation architecture is designed for on-device operation.

## Stack and layout

Expo SDK 58, React Native 0.88, React 19.3, strict TypeScript, Expo Router, Zustand,
Reanimated/Worklets, SVG, ESLint, Prettier, Jest Expo and React Native Testing Library.
Exact installed versions are recorded in `package-lock.json`.

```text
app/                         five tab routes and root layout
src/components/layout/       reusable accessible placeholder screen
src/theme/                   semantic design tokens
src/models/                  telemetry, tracking and evaluation contracts
src/services/telemetry/      provider interface and manual fixture adapter
src/stores/                  monitoring store factory and provider binding
src/features/                tracking/evaluation/visualization boundaries
assets/models/               Stage 2 model guidance
 tests/                      focused component and contract tests
 docs/                       architecture, integration, roadmap and decisions
```

Routes depend on shared presentation. Providers normalize transport events into
UI-independent contracts. The same Zustand binding accepts future BLE/Wi-Fi
providers without screen or evaluation rewrites. Camera processing has its own
boundary; image pixels cannot masquerade as physical distances. Visualization will
consume derived state rather than owning a second telemetry store.

## Quality checks

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run check
npx expo install --check
npx expo-doctor
npx expo export --platform all
```

Use `npm run format` to format sources. Tests live outside `app/`. See
[verification](docs/verification.md) for actual execution results and runtime limits.

## Current limitations

Only five themed, navigable placeholders are implemented. There are no fake charts,
readings, inert test buttons, camera permissions or device control commands. The
mock provider only accepts injected fixtures and is not automatically connected.
The interruption policy is a tested pure function; the runtime watchdog is Stage 3.
No BLE/Wi-Fi, continuous simulation, vision algorithm, distance estimation, evaluation
engine, persistence, reports or 3D stack is implemented. Readonly results are contracts,
not runtime immutable storage. Light mode is deferred.

## Development stages and documentation

1. Foundation, contracts, navigation and tooling — current.
2. Modern mobile UI and robot visualization.
3. Simulated telemetry and data management.
4. Camera-based detection.
5. Motion, direction and calibrated measurement.
6. Automated evaluation rules.
7. Recording, reporting and history.

Read [architecture](docs/architecture.md), [hardware contract](docs/hardware-integration-contract.md),
[roadmap](docs/development-roadmap.md) and [technical decisions](docs/technical-decisions.md).
Stage 2 can reuse the routes, layout, tokens and visualization props; validate the
native GL prototype before committing to detailed assets.
