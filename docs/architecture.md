# Architecture

Stage 1 establishes contracts and presentation scaffolding. There is no evaluation,
tracking, recording, or simulator engine. No specification PDF was present in the
workspace; the supplied Stage 1 brief is the current requirements source. Obtain
and trace the authoritative specification before implementing task rules.

## Boundaries and data flow

```text
BLE / Wi-Fi / fixture adapter
  -> validate and normalize -> TelemetryProvider events
  -> session coordinator -> Zustand monitoring store -> screens / visualization
                            -> evaluation input stream (Stage 6)
Phone camera -> TrackingProvider -> camera observations + validity
             -> calibrated measurement pipeline (Stage 5)
             -> tracking feature state -> screens / evaluation
Evaluation -> finalized result -> append-only local repository -> reports (Stage 7)
```

`app/` owns routes only. Shared layout and tokens live in `src/components` and
`src/theme`. `src/models` contains platform-independent domain contracts.
`src/services/telemetry` owns transport lifecycle and normalization; it imports no
UI. Feature contracts under `src/features` define future ownership without empty
service implementations. `tests/` stays outside Expo Router's route directory.

The root route is the monitoring dashboard; `/camera`, `/tests`, `/reports`, and
`/settings` are the other four tabs. Native safe areas, scrollable content, system
fonts and scalable text support phone sizes. A dark theme is the sole Stage 1
palette; semantic tokens support a later light theme without screen rewrites.

## State ownership

Create one monitoring store per application session; `bindTelemetry` accepts any
provider, and returns subscription cleanup. No provider is connected on launch in
Stage 1. The adapter/store integration is exercised in tests. Stage 3 will mount a
session coordinator, choose an injected provider, subscribe before connecting,
and unsubscribe/disconnect/dispose on replacement or unmount. Catch rejected
connect/disconnect promises and surface errors; listener callbacks must not throw.
Do not swap providers during an evaluation; preserve provenance on every sample.

Monitoring owns connection, latest accepted sample and errors. A future coordinator
owns monotonic connection/sample times and a watchdog; the pure freshness policy
is already tested, but no running watchdog is claimed. Transport connection and
data freshness are independent. Invalid packets never renew freshness. Persist
interruption events in future test records instead of losing them on recovery.

Evaluation owns selection and lifecycle using `EvaluationSessionState`; tracking
owns observations and calibration. These feature stores will be introduced when
needed. Visualization is derived from telemetry and tracking through
`RobotVisualizationState`, not a duplicated global source of truth. Camera-derived
motion must never be filled from robot telemetry. Null means unavailable, not zero.

## Measurement and record integrity

Image poses use pixels; world poses use meters with calibration/frame identifiers.
Travel distance and displacement are separate calibrated estimates. Orientation
is explicitly radians for tracking and degrees for robot tilt. A synchronized
clock mapping will be needed to correlate robot, video and phone observations.

Finalized result fields and nested arrays are readonly at the TypeScript boundary.
That is not runtime tamper protection. Stage 7 must validate and freeze records,
write append-only transactions, expose no outcome-edit API, and retain corrections
as linked records. A local database cannot guarantee protection against a device
owner modifying files; signatures or hashes alone are not an authenticated audit
trail. No failure-to-success UI override is permitted.

No backend is required. Evaluation, evidence and history should work offline;
network access is only an optional robot transport, not a cloud dependency.
